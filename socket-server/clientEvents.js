

const clientEventPost = ({ io, client }, event) => {
  client
  .broadcast
  .emit('eventPosted', event)
}

const clientEventUpdate = ({ io, client }, event) => {
  client
  .broadcast
  .emit('eventUpdated', event)
}

const clientEventDelete = ({ io, client }, event) => {
  client
  .broadcast
  .emit('eventDeleted', event)
}

const clientEvents ={
  'clientEventPost': clientEventPost,
  'clientEventUpdate': clientEventUpdate,
  'clientEventDelete': clientEventDelete
 }