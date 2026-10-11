// =====================================================
// ELEMENTS
// =====================================================

// Header
const openAddContactBtn = document.getElementById("openAddContactBtn");

// Modal
const contactModal = document.getElementById("contactModal");
const closeContactModal = document.getElementById("closeContactModal");
const cancelContactBtn = document.getElementById("cancelContactBtn");
const modalTitle = document.getElementById("modalTitle");

// Form
const contactForm = document.getElementById("contactForm");

// Photo
const changePhotoBtn = document.getElementById("changePhotoBtn");
const photoInput = document.getElementById("photoInput");
const contactPhotoPreview = document.getElementById("contactPhotoPreview");
const defaultUserIcon = document.getElementById("defaultUserIcon");

// Form Inputs
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const group = document.getElementById("group");
const notes = document.getElementById("notes");
const favorite = document.getElementById("favorite");
const emergency = document.getElementById("emergency");

// Errors
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");

// Statistics
const totalContacts = document.getElementById("totalContacts");
const favoriteContacts = document.getElementById("favoriteContacts");
const emergencyContacts = document.getElementById("emergencyContacts");

// Contacts
const contactsContainer = document.getElementById("contactsContainer");
const emptyContacts = document.getElementById("emptyContacts");

// Search
const searchInput = document.getElementById("searchInput");

// Side Panels
const favoritesContainer = document.getElementById("favoritesContainer");
const emergencyContainer = document.getElementById("emergencyContainer");

// Description count
const contactsCountText = document.getElementById("contactsCountText");


// =====================================================
// DATA
// =====================================================

const contacts = [];

let editContactId = null;

let currentPhoto = "";


// =====================================================
// OPEN MODAL
// =====================================================

const openModal = () => {
    contactModal.classList.add("active");
};


// =====================================================
// CLOSE MODAL
// =====================================================

const closeModal = () => {
    contactModal.classList.remove("active");
};


// =====================================================
// RESET FORM
// =====================================================

const resetForm = () => {

    contactForm.reset();

    editContactId = null;

    currentPhoto = "";

    modalTitle.textContent = "Add New Contact";

    contactPhotoPreview.src = "";
    contactPhotoPreview.style.display = "none";

    defaultUserIcon.style.display = "block";

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";

    nameError.style.display = "none";
    phoneError.style.display = "none";
    emailError.style.display = "none";

};


// =====================================================
// ADD CONTACT BUTTON
// =====================================================

openAddContactBtn.addEventListener("click", () => {

    resetForm();

    openModal();

});


// =====================================================
// CLOSE BUTTON
// =====================================================

closeContactModal.addEventListener("click", () => {
    closeModal();
});


// =====================================================
// CANCEL BUTTON
// =====================================================

cancelContactBtn.addEventListener("click", () => {
    closeModal();
});


// =====================================================
// CLOSE MODAL WHEN CLICK OUTSIDE
// =====================================================

contactModal.addEventListener("click", (event) => {

    if (event.target === contactModal) {
        closeModal();
    }

});


// =====================================================
// CHANGE PHOTO
// =====================================================

changePhotoBtn.addEventListener("click", () => {
    photoInput.click();
});


// =====================================================
// PHOTO PREVIEW
// =====================================================

photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (file) {

        const imageURL = URL.createObjectURL(file);

        currentPhoto = imageURL;

        contactPhotoPreview.src = imageURL;
        contactPhotoPreview.style.display = "block";

        defaultUserIcon.style.display = "none";
    }

});


// =====================================================
// VALIDATION
// =====================================================

const validateForm = () => {

    let isValid = true;

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";

    nameError.style.display = "none";
    phoneError.style.display = "none";
    emailError.style.display = "none";


    // Full Name
    const nameValue = fullName.value.trim();

    const namePattern = /^[A-Za-z\u0600-\u06FF ]{2,50}$/;

    if (!namePattern.test(nameValue)) {

        nameError.textContent =
            "Name should contain only letters and spaces (2-50 characters)";

        nameError.style.display = "block";

        isValid = false;
    }


    // Phone
    const phoneValue = phone.value.trim();

    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (!phonePattern.test(phoneValue)) {

        phoneError.textContent =
            "Please enter a valid phone number";

        phoneError.style.display = "block";

        isValid = false;
    }


    // Email
    const emailValue = email.value.trim();

    if (emailValue !== "") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            emailError.textContent =
                "Please enter a valid email";

            emailError.style.display = "block";

            isValid = false;
        }
    }


    return isValid;
};


// =====================================================
// CREATE CONTACT
// =====================================================

const createContact = () => {

    const contact = {

        id: Date.now(),

        name: fullName.value.trim(),

        phone: phone.value.trim(),

        email: email.value.trim(),

        address: address.value.trim(),

        group: group.value,

        notes: notes.value.trim(),

        favorite: favorite.checked,

        emergency: emergency.checked,

        image: currentPhoto

    };

    contacts.push(contact);
};


// =====================================================
// UPDATE CONTACT
// =====================================================

const updateContact = () => {

    const contact = contacts.find((item) => {
        return item.id === editContactId;
    });

    if (!contact) {
        return;
    }

    contact.name = fullName.value.trim();
    contact.phone = phone.value.trim();
    contact.email = email.value.trim();
    contact.address = address.value.trim();
    contact.group = group.value;
    contact.notes = notes.value.trim();
    contact.favorite = favorite.checked;
    contact.emergency = emergency.checked;
    contact.image = currentPhoto;
};


// =====================================================
// UPDATE STATISTICS
// =====================================================

const updateStatistics = () => {

    const favorites = contacts.filter((contact) => {
        return contact.favorite;
    }).length;

    const emergencies = contacts.filter((contact) => {
        return contact.emergency;
    }).length;

    totalContacts.textContent = contacts.length;
    favoriteContacts.textContent = favorites;
    emergencyContacts.textContent = emergencies;

    if (contactsCountText) {
        contactsCountText.textContent = contacts.length;
    }
};


// =====================================================
// CREATE CONTACT PHOTO
// =====================================================

const getContactPhoto = (contact) => {

    if (contact.image) {

        return `
            <img src="${contact.image}" alt="${contact.name}">
        `;

    }

    return `
        <span>
            ${contact.name.charAt(0).toUpperCase()}
        </span>
    `;
};


// =====================================================
// RENDER CONTACTS
// =====================================================

const renderContacts = (list = contacts) => {

    contactsContainer.innerHTML = "";


    if (list.length === 0) {

        const message = document.createElement("div");

        message.className = "no-results";

        if (contacts.length === 0) {

            message.innerHTML = `
                <i class="fa-regular fa-address-book"></i>
                <h3>No contacts found</h3>
                <p>Click "Add Contact" to get started</p>
            `;

        } else {

            message.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>No contacts found</h3>
                <p>Try searching with another name, phone or email...</p>
            `;
        }

        contactsContainer.appendChild(message);

        return;
    }


    list.forEach((contact) => {

        const contactCard = document.createElement("div");

        contactCard.className = "contact-card";

        contactCard.dataset.id = contact.id;


        contactCard.innerHTML = `

            <div class="contact-card-header">

                <div class="contact-avatar">
                    ${getContactPhoto(contact)}
                </div>

                <div class="contact-info">

                    <h3>${contact.name}</h3>

                    <div class="phone-info">
                        <i class="fa-solid fa-phone"></i>
                        <span>${contact.phone}</span>
                    </div>

                </div>

                <div class="contact-status">

                    ${
                        contact.favorite
                            ? `<i class="fa-solid fa-star favorite-icon"></i>`
                            : ""
                    }

                    ${
                        contact.emergency
                            ? `<i class="fa-solid fa-heart-pulse emergency-icon"></i>`
                            : ""
                    }

                </div>

            </div>


            <div class="contact-details">

                ${
                    contact.email
                        ? `
                            <div class="contact-detail">
                                <i class="fa-solid fa-envelope"></i>
                                <span>${contact.email}</span>
                            </div>
                        `
                        : ""
                }

                ${
                    contact.address
                        ? `
                            <div class="contact-detail">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>${contact.address}</span>
                            </div>
                        `
                        : ""
                }

            </div>


            <div class="contact-tags">

                ${
                    contact.group
                        ? `<span class="group-tag">${contact.group}</span>`
                        : ""
                }

                ${
                    contact.emergency
                        ? `
                            <span class="emergency-tag">
                                <i class="fa-solid fa-heart-pulse"></i>
                                Emergency
                            </span>
                        `
                        : ""
                }

            </div>


            ${
                contact.notes
                    ? `
                        <div class="contact-notes">
                            <i class="fa-solid fa-note-sticky"></i>
                            <span>${contact.notes}</span>
                        </div>
                    `
                    : ""
            }


            <div class="contact-actions">

                <a href="tel:${contact.phone}" title="Call">
                    <i class="fa-solid fa-phone"></i>
                </a>

                ${
                    contact.email
                        ? `
                            <a href="mailto:${contact.email}" title="Email">
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                        `
                        : ""
                }

                <button
                    type="button"
                    class="favorite-action ${contact.favorite ? "active" : ""}"
                    data-action="favorite"
                    data-id="${contact.id}"
                    title="Favorite"
                >
                    <i class="fa-solid fa-star"></i>
                </button>

                <button
                    type="button"
                    class="emergency-action ${contact.emergency ? "active" : ""}"
                    data-action="emergency"
                    data-id="${contact.id}"
                    title="Emergency"
                >
                    <i class="fa-solid fa-heart-pulse"></i>
                </button>

                <button
                    type="button"
                    data-action="edit"
                    data-id="${contact.id}"
                    title="Edit"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    type="button"
                    data-action="delete"
                    data-id="${contact.id}"
                    title="Delete"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        contactsContainer.appendChild(contactCard);

    });

};


// =====================================================
// RENDER FAVORITES
// =====================================================

const renderFavorites = () => {

    favoritesContainer.innerHTML = "";

    const favoriteList = contacts.filter((contact) => {
        return contact.favorite;
    });


    if (favoriteList.length === 0) {

        favoritesContainer.innerHTML = `
            <p class="panel-empty-text">No favorites yet</p>
        `;

        return;
    }


    favoriteList.forEach((contact) => {

        const favoriteItem =
            document.createElement("div");

        favoriteItem.className = "side-contact-item";

        favoriteItem.innerHTML = `

            <div class="side-contact-avatar">
                ${getContactPhoto(contact)}
            </div>

            <div class="side-contact-info">
                <strong>${contact.name}</strong>
                <span>${contact.phone}</span>
            </div>

            <a href="tel:${contact.phone}" class="side-call">
                <i class="fa-solid fa-phone"></i>
            </a>

        `;

        favoritesContainer.appendChild(favoriteItem);

    });

};


// =====================================================
// RENDER EMERGENCY
// =====================================================

const renderEmergency = () => {

    emergencyContainer.innerHTML = "";

    const emergencyList = contacts.filter((contact) => {
        return contact.emergency;
    });


    if (emergencyList.length === 0) {

        emergencyContainer.innerHTML = `
            <p class="panel-empty-text">
                No emergency contacts
            </p>
        `;

        return;
    }


    emergencyList.forEach((contact) => {

        const emergencyItem =
            document.createElement("div");

        emergencyItem.className = "side-contact-item";

        emergencyItem.innerHTML = `

            <div class="side-contact-avatar">
                ${getContactPhoto(contact)}
            </div>

            <div class="side-contact-info">
                <strong>${contact.name}</strong>
                <span>${contact.phone}</span>
            </div>

            <a
                href="tel:${contact.phone}"
                class="side-call emergency-call"
            >
                <i class="fa-solid fa-phone"></i>
            </a>

        `;

        emergencyContainer.appendChild(emergencyItem);

    });

};


// =====================================================
// EDIT CONTACT
// =====================================================

const editContact = (id) => {

    const contact = contacts.find((item) => {
        return item.id === id;
    });

    if (!contact) {
        return;
    }


    editContactId = id;

    modalTitle.textContent = "Edit Contact";


    fullName.value = contact.name;
    phone.value = contact.phone;
    email.value = contact.email;
    address.value = contact.address;
    group.value = contact.group;
    notes.value = contact.notes;

    favorite.checked = contact.favorite;
    emergency.checked = contact.emergency;


    currentPhoto = contact.image;


    if (contact.image) {

        contactPhotoPreview.src = contact.image;
        contactPhotoPreview.style.display = "block";
        defaultUserIcon.style.display = "none";

    } else {

        contactPhotoPreview.src = "";
        contactPhotoPreview.style.display = "none";
        defaultUserIcon.style.display = "block";

    }


    openModal();

};


// =====================================================
// DELETE CONTACT
// =====================================================

const deleteContact = (id) => {

    const contactIndex = contacts.findIndex((contact) => {
        return contact.id === id;
    });

    if (contactIndex === -1) {
        return;
    }


    contacts.splice(contactIndex, 1);


    renderContacts();
    updateStatistics();
    renderFavorites();
    renderEmergency();

};


// =====================================================
// TOGGLE FAVORITE
// =====================================================

const toggleFavorite = (id) => {

    const contact = contacts.find((item) => {
        return item.id === id;
    });

    if (!contact) {
        return;
    }


    contact.favorite = !contact.favorite;


    renderContacts();
    updateStatistics();
    renderFavorites();

};


// =====================================================
// TOGGLE EMERGENCY
// =====================================================

const toggleEmergency = (id) => {

    const contact = contacts.find((item) => {
        return item.id === id;
    });

    if (!contact) {
        return;
    }


    contact.emergency = !contact.emergency;


    renderContacts();
    updateStatistics();
    renderEmergency();

};


// =====================================================
// CONTACT CARD ACTIONS
// =====================================================

contactsContainer.addEventListener("click", (event) => {

    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }


    const id = Number(button.dataset.id);

    const action = button.dataset.action;


    if (action === "edit") {
        editContact(id);
    }

    if (action === "delete") {
        deleteContact(id);
    }

    if (action === "favorite") {
        toggleFavorite(id);
    }

    if (action === "emergency") {
        toggleEmergency(id);
    }

});


// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.trim().toLowerCase();


    const filteredContacts = contacts.filter((contact) => {

        return (
            contact.name.toLowerCase().includes(searchValue) ||
            contact.phone.toLowerCase().includes(searchValue) ||
            contact.email.toLowerCase().includes(searchValue) ||
            contact.address.toLowerCase().includes(searchValue) ||
            contact.group.toLowerCase().includes(searchValue)
        );

    });


    renderContacts(filteredContacts);

});


// =====================================================
// FORM SUBMIT
// =====================================================

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const isValid = validateForm();


    if (!isValid) {
        return;
    }


    if (editContactId === null) {

        createContact();

    } else {

        updateContact();

    }


    renderContacts();

    updateStatistics();

    renderFavorites();

    renderEmergency();


    resetForm();

    closeModal();

});


// =====================================================
// INITIAL RENDER
// =====================================================

renderContacts();

updateStatistics();

renderFavorites();

renderEmergency();