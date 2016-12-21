# Server-Inventory

## Adding fields to node server

For adding the fields in server model go to server > models > server.model.js
```javascript
/**
 * Server Schema
 */
const ServerSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  serverName: {
    type: String,
    required: true
  },
  dbName: {
    type: String,
    required: true
  },
  dc: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: false
  },
  memory: {
    type: String,
    required: false
  },
  os: {
    type: String,
    required: false
  },
  mac: {
    type: String,
    required: false
  },
  ipv4: {
    type: String,
    required: false
  },
  ipv6: {
    type: String,
    required: false
  },
  secZone: {
    type: String,
    required: false
  },
  entityType: {
    type: String,
    required: false
  },
  vlan: {
    type: String,
    required: false
  },
  newField: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  } // Here you can add new fields the same way as above
});
```
This will add fields in server model. Now to store the fields we need to assgin them to model for that.
Go tp config > param-validation.js.
In bodies JSON there is a field serverBody
```javascript
serverBody: {
  applicationId: Joi.string().hex().required(),
  serverName: Joi.string().required(),
  dbName: Joi.string().required(),
  dc: Joi.string().required(),
  cpu: Joi.string().required(),
  memory: Joi.string().required(),
  os: Joi.string().required(),
  mac: Joi.string().required(),
  ipv4: Joi.string().required(),
  ipv6: Joi.string().required(),
  secZone: Joi.string().required(),
  entityType: Joi.string().required(),
  vlan: Joi.string().required(),
  newField: Joi.string().required(),
  // Add your fields here
}
```
You can add the fields that will be sent by client that will be validated here.

Not to assign those values to server model we need to go to servers > controllers > server.controller.js file

While creating
```javascript
function create(req, res, next) {
  const server = new Server({
    application: req.body.applicationId,
    serverName: req.body.serverName,
    dbName: req.body.dbName,
    dc: req.body.dc,
    cpu: req.body.cpu,
    memory: req.body.memory,
    os: req.body.os,
    mac: req.body.mac,
    ipv4: req.body.ipv4,
    ipv6: req.body.ipv6,
    secZone: req.body.secZone,
    entityType: req.body.entityType,
    vlan: req.body.vlan,
    newField: req.body.newField,
    // Add the new filed here
  });
  
  // Rest of the code
```

While updating
```javascript
function update(req, res, next) {
  const server = req.server;
  server.application = req.body.applicationId;
  server.serverName = req.body.serverName;
  server.dbName = req.body.dbName;
  server.dc = req.body.dc;
  server.cpu = req.body.cpu;
  server.memory = req.body.memory;
  server.os = req.body.os;
  server.mac = req.body.mac;
  server.ipv4 = req.body.ipv4;
  server.ipv6 = req.body.ipv6;
  server.secZone = req.body.secZone;
  server.entityType = req.body.entityType;
  server.vlan = req.body.vlan;
  server.newField = req.body.newField;
  // add your fields here
  
  // Rest of the code
}
```
Done. There is the same process for adding the fields in application model.

## Adding fields to Client

For adding Fields in server model go to client > src > app > pages > servers > servers.html

There is table which is displayed when clicking on the servers tab.
There will be a <thead> tag which contains headings of the table columns
There will be a <tbody> tag which sets the data for the row

You can add the fields here just matching the fields that we have added in the node server.

Similarly to create a server from client go to modals > createServer.modal.html file and add the fields that are required.

Just cope this at the end and then replace the values with the fields that are required,

```html
<div class="col-md-6">
  <div class="form-group has-feedback"
    ng-class="{'has-error': vm.createServerForm.newField.$invalid && (vm.createServerForm.newField.$dirty || vm.createServerForm.$submitted)}">
    
    <label for="newField">Server newField</label>
    <input type="text" class="form-control" id="newField" name="newField"
      placeholder="Server newField"
      ng-model="vm.modalServer.newField" required>
      
    <span class="help-block error-block basic-block">This field is required!</span>
  </div>
</div>
```
And replace the newField with the field name that you want to add. 
There will the same process for update and show details. 
Just copy any of the already existing fields and replace the keys with the new fields that you want.


The process for adding the fields to application is same.

## Meta

Ravindra Bhakta – ravindrabhakta07@gmail.com
