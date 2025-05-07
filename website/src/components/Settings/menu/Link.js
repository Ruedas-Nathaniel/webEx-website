import React, { useState } from "react";
import styles from "./Link.module.css";

const defaultLinks = [
    { id: 1, name: "Google", url: "https://www.google.com", active: true },
    { id: 2, name: "Facebook", url: "https://www.facebook.com", active: false },
    { id: 3, name: "YouTube", url: "https://www.youtube.com", active: true },
    { id: 4, name: "Reddit", url: "https://www.reddit.com", active: false },
    { id: 5, name: "Twitter", url: "https://www.twitter.com", active: true },
    { id: 6, name: "LinkedIn", url: "https://www.linkedin.com", active: false },
];

const Links = () => {
    const [links, setLinks] = useState(defaultLinks);
    const [newLink, setNewLink] = useState({ name: "", url: "" });
    const [editingId, setEditingId] = useState(null);

    const handleAddLink = () => {
        const { name, url } = newLink;

        // Basic validation
        if (!name.trim() || !url.trim()) {
            alert("Both name and URL are required.");
            return;
        }

        // Simple URL validation
        const isValidUrl = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(url);
        if (!isValidUrl) {
            alert("Please enter a valid URL (starting with http:// or https://).");
            return;
        }

        const id = Date.now();
        setLinks([...links, { ...newLink, id, active: false }]);
        setNewLink({ name: "", url: "" }); // Clear form
    };


    const handleEditChange = (id, field, value) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id ? { ...link, [field]: value } : link
            )
        );
    };

    const handleToggle = (id) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id ? { ...link, active: !link.active } : link
            )
        );
    };

    return (
        <div className={styles.linksContainer}>
            <h2>Manage Your Links</h2>

            <div className={styles.addForm}>
                <input
                    type="text"
                    placeholder="Link Name"
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Link URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <button onClick={handleAddLink}>Add Link</button>
            </div>


            <div className={styles.grid}>
                {links.map((link) => (
                    <div className={styles.linkCard} key={link.id}>
                        {editingId === link.id ? (
                            <>
                                <input
                                    type="text"
                                    value={link.name}
                                    onChange={(e) =>
                                        handleEditChange(link.id, "name", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) =>
                                        handleEditChange(link.id, "url", e.target.value)
                                    }
                                />
                                <button onClick={() => setEditingId(null)}>Save</button>
                            </>
                        ) : (
                            <>
                                <h4>{link.name}</h4>
                                <p>{link.url}</p>
                                <div className={styles.cardControls}>
                                    <button onClick={() => setEditingId(link.id)}>Edit</button>
                                    <label className={styles.toggle}>
                                        <input
                                            type="checkbox"
                                            checked={link.active}
                                            onChange={() => handleToggle(link.id)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Links;
