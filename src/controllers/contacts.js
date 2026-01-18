const {
  contacts,
  sortContacts,
  filterContacts,
  validateContactData,
} = require("@jworkman-fs/asl");

// Initialize local data
let contactsData = [...contacts];

module.exports = {
  // GET /v1/contacts
  getAllContacts: (req, res) => {
    let results = [...contactsData];

    // MAPPING
    const filterMap = {
      firstName: "fname",
      lastName: "lname",
      email: "email",
      phone: "phone",
      birthday: "birthday",
    };

    // --- 1. FILTERING ---
    const filterBy = req.get("X-Filter-By");
    const filterOp = req.get("X-Filter-Operator");
    const filterVal = req.get("X-Filter-Value");

    if (filterBy && filterOp) {
      let field = filterMap[filterBy] || filterBy;

      let value = filterVal;
      if (!value) {
        value = req.query[filterBy] || req.query[field];
      }

      if (value) {
        try {
          results = filterContacts(results, field, filterOp, value);
        } catch (e) {
          results = [];
        }
      }
    } else {
      Object.keys(req.query).forEach((key) => {
        if (filterMap[key]) {
          try {
            results = filterContacts(
              results,
              filterMap[key],
              "eq",
              req.query[key]
            );
          } catch (err) {
            results = [];
          }
        }
      });
    }

    // --- 2. SORTING ---
    if (req.query.sort) {
      const field = filterMap[req.query.sort] || req.query.sort;
      const direction = req.query.direction || "asc";

      const sorted = sortContacts(results, field, direction);
      if (sorted) results = sorted;
    }

    // --- 3. PAGINATION ---
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = results.length;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedResults = results.slice(startIndex, endIndex);

    res.set("X-Total-Count", totalCount);
    res.set("X-Total-Pages", totalPages);
    res.set("X-Page", page);

    res.json(paginatedResults);
  },

  // GET /v1/contacts/:id
  getContactById: (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contactsData.find((c) => c.id === id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  },

  // POST /v1/contacts
  createContact: (req, res) => {
    try {
      validateContactData(req.body);
    } catch (err) {
      return res.status(400).json({ message: "Invalid contact data" });
    }

    const maxId = contactsData.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newContact = {
      id: maxId + 1,
      ...req.body,
    };

    contactsData.push(newContact);

    res.set("Location", `/v1/contacts/${newContact.id}`);
    res.status(303).send();
  },

  // PUT /v1/contacts/:id
  updateContact: (req, res) => {
    const id = parseInt(req.params.id);
    const index = contactsData.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = {
      ...contactsData[index],
      ...req.body,
      id: id,
    };

    contactsData[index] = updatedContact;

    res.json(updatedContact);
  },

  // DELETE /v1/contacts/:id
  deleteContact: (req, res) => {
    const id = parseInt(req.params.id);
    const index = contactsData.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contactsData.splice(index, 1);
    res.status(204).send();
  },
};
