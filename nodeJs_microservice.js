“Small is beautiful."
"Make each program do one thing well.”
“Don't Repeat Yourself (DRY) ”
“Keep It Simple, Stupid (KISS)”


Reactor pattern

“ccessing the RAM is in the order of nanoseconds”

“accessing data on the disk or the network is in the order of milliseconds”

“I/O is slow”
Blocking I/O


// blocks the thread until the data is available
data = socket.read()
// data is available
print(data)


mordern system “Non-blocking I/O”



“The most basic pattern for dealing with this type of non-blocking I/O is to actively poll the resource within a loop until some actual data is returned. This is called busy-waiting.”





resources = [socketA, socketB, fileA]
while (!resources.isEmpty()) {
  for (resource of resources) {
    // try to read
    data = resource.read()
    if (data === NO_DATA_AVAILABLE) {
      // there is no data to read at the moment
      continue
    }
    if (data === RESOURCE_CLOSED) {
      // the resource was closed, remove it from the list
      resources.remove(i)
    } else {
      //some data was received, process it
      consumeData(data)
    }
  }
}





//REACTOR PATTERN

handler associated with each I/O operation. A handler in Node.js is represented by a callback (or cb for short) function.


1. Event Demultiplexer->
    

“The require function is synchronous”
import is asyncronous



JSON ==> Javascript object notation
REST ==> Representational state transfer

API gateway==> 

CQRS ==> command Query Responsibility Segregation.

Challanges in microservices-->
1.data management between services


every serice gets its own DB why?
    1. to run each service independently.
    2. one service can change DB/schema structure.


solve data management
Sync Async


Sync->  services comunicate using request.
Async-> services comunicate using events.


Manual testing
Automated testing






















































{
    "selectedRoles" : [ 
        {
            "value" : "6012e3fa791fd200129bb18f",
            "label" : "AppAdministrator"
        }, 
        {
            "value" : "6051f6b490bcaa0011c29af0",
            "label" : "MS&P"
        }
    ],
    "rank" : 6,
    "hide" : true,
    "isActive" : true,
    "isCustom" : true,
    "conditions" : [],
    "title" : "Brand Form",
    "name" : "BrandForm",
    "description" : "Brand Form",
    "type" : "dashboard",
    "chart" : [ 
        {
            "chartData" : {
                "selectedDataElement" : [ 
                    {
                        "value" : "Brand",
                        "label" : "Brand"
                    }, 
                    {
                        "value" : "BrandFormName",
                        "label" : "Brandform Name"
                    }
                ],
                "selectedGroupingDataElement" : [],
                "selectedDataLabels" : [],
                "selectedDataPages" : [],
                "selectedDataColumns" : [],
                "conditions" : [],
                "links" : [],
                "categories" : [],
                "backgrounds" : [],
                "width" : "500",
                "height" : "500",
                "layout" : {
                    "w" : 12,
                    "h" : 19,
                    "x" : 0,
                    "y" : 0,
                    "i" : "0",
                    "moved" : false,
                    "static" : false
                },
                "name" : "Brandforms",
                "rowsPerPage" : 100,
                "selectedDataModel" : "603f6ec326135d00116e3cc2",
                "dataUrl" : "",
                "dataHandler" : "data_models",
                "associatedFormName" : "BrandForm",
                "pageLinking" : "form_page",
                "metric" : "total",
                "selectedTypeKey" : "",
                "enableLinking" : false,
                "selectedLinkValue" : "",
                "selectedTitleColumn" : ""
            },
            "_id" : ObjectId("603f6ec426135d00116e3ccd"),
            "chartUniqueId" : "612a751f",
            "chartType" : "list"
        }
    ],
    "url" : "BrandForm",
    "default" : false,
    "appId" : "6012e3fa791fd200129bb188",
    "__v" : 35,
    "pageLevelDataModel" : "",
    "selectedFilterDataElements" : [],
    "body" : {}
}



db.BrandForm.aggregate([
 {
  $lookup: {
   from: "BrandFormDetail",
   "localField": "Brand", 
    "foreignField": "Brand", 
   as: "result"
  }
 },
  
 { "$unwind": "$result" }, 
  {
  $match: {
   'result.currentFF' : '01',
   'result.fiscalYear' : "2022",
   $expr: { $eq: [ "$BrandFormName" , "$result.BrandFormName" ] } 
  }
 }
]
)


{
  "dataSource": [
    {
      "dataModelId": "dataModelId1",
      "selectedFields": ['fieldA1','fieldA2', 'fieldA3' ],
    },
    {
      "dataModelId": "dataModelId2",
      "selectedFields": ['fieldB1','fieldB2', 'fieldB3' ]
    },
  ],
  "keysToCompare": [
    {
        dataModelId1: 'key1', // currentCase Brand,
        dataModelId2: 'key2', // currentCase BrandName   
    },
      {
        dataModelId1: 'key3', // currentCase Brandform,
        dataModelId2: 'key4', // currentCase BrandformName   
    },
  ]
}








