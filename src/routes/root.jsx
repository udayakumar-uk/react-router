import React, {useEffect} from 'react'
import {Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit} from 'react-router-dom'
import { getContacts, createContact  } from "../contacts.js";


export async function Loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export async function Action() {
    const contacts = await createContact();
    return redirect(`/contacts/${contacts.id}/edit`);
    // return { contacts };
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
    <>
        <div id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
                <form id="search-form" role="search">
                    <input id="q" aria-label="Search contacts" className={searching ? "loading" : ""} defaultValue={q} placeholder="Search" type="search" name="q" 
                        onChange={(event) => {
                            const isFirstSearch = q == null;
                            submit(event.currentTarget.form, {
                              replace: !isFirstSearch,
                            });
                    }}/>
                    <div id="search-spinner" aria-hidden hidden={!searching} />
                    <div className="sr-only" aria-live="polite" ></div>
                </form>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>
            </div>
            <nav>
                {contacts.length ? (
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id}>
                            <NavLink to={`contacts/${contact.id}`}
                                className={({isActive, isPending}) => isActive ? 'active' : isPending ? 'pending': '' }
                            >
                                {contact.first || contact.last ? (
                                <>
                                    {contact.first} {contact.last}
                                </>
                                ) : (
                                <i>No Name</i>
                                )}{" "}
                                {contact.favorite && <span>★</span>}
                            </NavLink>
                            </li>
                        ))}
                        </ul>
                    ) : ( <p> <i>No contacts</i></p>
                )}
            </nav>
        </div>
        <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
            {/* <Link path="/">Home</Link> */}
            <Outlet />
        </div>
    </>
    );
}


