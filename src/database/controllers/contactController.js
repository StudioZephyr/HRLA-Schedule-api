import Promise from 'bluebird';

import { Contact } from '../model/contact';

const getAllContacts = (id) => {
  return new Promise((resolve, reject) => {
    Contact.findAll({ where: { UserId: id } })
      .then(contacts => {
        const contactArr = [];
        for (let i = 0; i < contacts.length; i++) {
          contactList.push(contacts[i].dataValues);
        }
        resolve(contactArr);
      })
      .catch(err => {
        console.log(`Error grabbing all Contacts for UserId: ${id}. Error: ${err}`);
        reject({
          message: `Error grabbing all Contacts`,
          error: true,
        });
      });
  });
};

export { getAllContacts };
