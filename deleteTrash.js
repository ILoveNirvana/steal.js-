
function setBackgrounds() {
    var elements = document.querySelectorAll('*');


    for (var i =  0; i < elements.length; i++) {

        var backgroundImg = window.getComputedStyle(elements[i]).getPropertyValue("background-image");
        if (backgroundImg != 'none') {
            var path = backgroundImg.slice(5, -2).split('/');
            var finalUrl = "url('index_files/" + path[path.length - 1] + "')";
            elements[i].style.backgroundImage = finalUrl;
        }
    }
}
function getBackgrounds() {
    var elements = document.querySelectorAll('*');


    for (var i =  0; i < elements.length; i++) {

        var backgroundImg = window.getComputedStyle(elements[i]).getPropertyValue("background-image");
        if (backgroundImg != 'none') {
            var path = backgroundImg.slice(5, -2).split('/');
            document.body.innerHTML += '<img src="' + path.join('/') + '" style="display:none;">';
        }
    }
}

function setRobots() {
    document.head.innerHTML += '<meta name="robots" content="noindex,nofollow">';
    document.body.innerHTML += '<div id="deleteTrashDone" style="display: none;"></div>';
}

function setForm() {
    document.body.innerHTML += `<div id="asa_ua_devdep-contact-form">
        <input id="asa_ua_devdep-show-form" class="asa_ua_devdep-button" type="button" value="CONTACT US" />
        <form id="asa_ua_devdep-form_contact">
            <a href="#" id="asa_ua_devdep-open-block-close" title="close">x</a>
            <input id="asa_ua_devdep-name" type="text" placeholder="Name" required/>
            <br/>
            <input id="asa_ua_devdep-phone" type="tel" placeholder="Phone" required/>
            <br/>
            <input id="asa_ua_devdep-email" type="email" placeholder="Email" required/>
            <br/>
            <textarea id="asa_ua_devdep-comment" rows="4" cols="50" placeholder="Message..." required></textarea>
            <br/>
            <input id="asa_ua_devdep-send_button" class="button" type="submit" value="Send" />
        </form>
        <style>
        
        #asa_ua_devdep-contact-form {
            position: fixed;
            top: 15%;
            right: 3px;
            z-index: 2147483647;
        }
        #asa_ua_devdep-contact-form * {
            all: unset;
            font-family: Arial,Helvetica,sans-serif;
            max-width: 100%;
        }
        
        #asa_ua_devdep-contact-form style,
        #asa_ua_devdep-contact-form script {
            display: none;
        }
        #asa_ua_devdep-contact-form .asa_ua_devdep-button {
            padding: 5px 10px;
            border-radius: 5px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-show-form {
            position: relative;
            right: -80%;
            border: none;
            background: red;
            opacity: 1;
            font-size: 13px;
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-form_contact {
            box-sizing: border-box;
            opacity: 0;
            width: 480px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #000;
            background: #fff;
            transition: all 0.5s;
            display: block;
            z-index: 2147483647;
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-form_contact.show {
            opacity: 1;
        }
        
        #asa_ua_devdep-contact-form input[type="text"],
        #asa_ua_devdep-contact-form input[type="tel"],
        #asa_ua_devdep-contact-form input[type="email"],
        #asa_ua_devdep-contact-form #asa_ua_devdep-comment {
            padding: 5px;
            border: 2px solid #000;
            border-radius: 5px;
            margin: 5px;
            box-sizing: border-box;
            color: #818181;
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-send_button {
            display: block;
            padding: 5px 10px;
            border: 2px solid #000;
            border-radius: 5px;
            color: #fff;
            background: #000;
            font-weight: bold;
            cursor: pointer;
            margin-left: 78%;
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-open-block-close {
            position: absolute;
            top: 15px;
            right: -5px;
            width: 24px;
            height: 24px;
            text-decoration: none;
            text-align: center;
            border: 2px solid #fff;
            background: #555;
            color: #fff;
            font: 700 20px/20px verdana, sans-serif;
            border-radius: 50%;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        }
        
        #asa_ua_devdep-contact-form #asa_ua_devdep-open-block-close:hover {
            background: #990000;
            color: #FAFAFA;
        }
        
        .open-block-close:hover {
            background: #f00;
        }
        </style>
        <script>
        var button_show = document.getElementById("asa_ua_devdep-show-form");
        button_show.addEventListener("click", show_field);

        function show_field() {
            if (document.getElementById("asa_ua_devdep-form_contact").classList.contains('show')) {
                button_show.style.opacity = "1";
                document.getElementById("asa_ua_devdep-form_contact").classList = "";
            } else {
                button_show.style.opacity = "0";
                document.getElementById("asa_ua_devdep-form_contact").classList = "show";
            }

        }

        var button_send = document.getElementById("asa_ua_devdep-form_contact");

        button_send.addEventListener("submit", delSub);

        function delSub(event) {
            event.preventDefault();

            sendQuery();
        }

        function sendQuery() {
            // get form data
            var data = {},
                urlEncodedData = "";
            urlEncodedDataPairs = [];
            data['name'] = document.getElementById("asa_ua_devdep-name").value;
            data['phone'] = document.getElementById("asa_ua_devdep-phone").value;
            data['email'] = document.getElementById("asa_ua_devdep-email").value;
            data['comment'] = document.getElementById("asa_ua_devdep-comment").value;
            console.log(data);

            // parse data
            for (name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

            // create new object-request
            var xhr = new XMLHttpRequest();

            // parameters
            xhr.open('POST', 'send.php');

            // set header
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");

            // send request
            xhr.send(urlEncodedData);

            // if error 
            xhr.onload = function() {
                show_field();
                if (xhr.status != 200) {
                    // ahow error
                    $.alert.open("info", "Sorry! :c", "Something get wrong!");
                } else {
                    $.alert.open("erorr", "Thank you!", "Thank you! We will answer to you soon as it possible!");
                }
            }
        }

        document.getElementById("asa_ua_devdep-open-block-close").addEventListener("click", show_field);
        //document.addEventListener('contextmenu', event => event.preventDefault());
        </script>
    </div>`;
    document.head.innerHTML += `<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>

<link href="http://appliance--clinic.com/alert/css/alert.css" rel="stylesheet" />
<link href="http://appliance--clinic.com/alert/themes/default/theme.css" rel="stylesheet" />
<script src="http://appliance--clinic.com/alert/js/alert.min.js"></script>`;
}


if(!document.getElementById('deleteTrashDone')) { deleteTrash(); setRobots(); }
if(!document.getElementById('asa_ua_devdep-show-form')) { setForm(); getBackgrounds(); }
document.body.contentEditable='true';
document.designMode='on';





let state = {
  dirty: true,
  modifying: false,
  robots: "UNSETED"
};

//<______________________________________________________DOM-Modifying

/*
*
*   @name nodeWalk
* 
*   @params elements: object - DOM of page (only ELEMENTS).
*
*   @description  Function get current DOM tree and modify this, after switch state of script for disabling second use of this function.
*
*   @return undefined
* 
 */

function nodeWalk(
  elements = function() { return document.body.querySelectorAll('*') }()
) {
  if(state.dirty) {
    const specifyedItems = [{type: "a", method: validationAnchor},{type: "link", method: validationLink},{type: "meta", method: validationMeta}]
    for (var i = specifyedItems.length - 1; i >= 0; i--) {
      validationSpecifyedItems(specifyedItems[i])
    }
    for (var i = disallowedTags.length - 1; i >= 0; i--) {
      deleteSpecifyedItems(disallowedTags[i])
    }
    for (var i = elements.length - 1; i >= 0; i--) {
      deleteAttributes(elements[i])
    }
    state.dirty = false;
  }
}

//DOM-Modifying<_________________________________________SPECIFYED_ITEMS-Deleting

/*
*
*   @name deleteSpecifyedItems
* 
*   @params item: array - Array with names of disalowed elements (in upper case)
*
*   @description  Function gets all elements by specifyed tag name and delete theys.
*
*   @return undefined
* 
 */

function deleteSpecifyedItems(
  item = ['SCRIPT', 'IFRAME', 'NOSCRIPT', 'FORM', 'AUDIO', 'VIDEO']
) {
  let items = document.getElementsByTagName(item)
  for (var i = items.length - 1; i >= 0; i--) {
    items[i].remove()
  }
}

//DOM-Modifying<-SPECIFYED_ITEMS-Deleting 😂4:20😂

//DOM-Modifying<_________________________________________SPECIFYED_ITEMS-Modifying

/*
*
*   @name validationSpecifyedItems
* 
*   @params item: object [{
*                               type: string - tag name (in lower case)
*                               method: function - function for processed current type of Nodes.
*                           }]
*
*   @description  Function gets all elements by specifyed tag name and modifying by specifyed method.
*
*   @return undefined
* 
 */

function validationSpecifyedItems(
  item = ['class', 'id', 'style', 'href', 'src', 'rel']
) {
  let items = document.getElementsByTagName(item.type)
  for (var i = items.length - 1; i >= 0; i--) { item.method(items[i]) }
}

//DOM-Modifying<-SPECIFYED_ITEMS-Modifying<___________________METHODS

/*
*
*   @name validationAnchor
* 
*   @params item: object - DOMNode (<a></a> element)
*
*   @description  Function take Node and change value of this 'href' attribute to "#".
*
*   @return undefined
* 
 */

function validationAnchor(element) {
  element.setAttribute('href', '#')
} 

/*
*
*   @name validationLink
* 
*   @params item: object - DOMNode (<link /> element)
*
*   @description  Function take Node and check does it element for including external CSS file, if not- remove current Node.
*
*   @return undefined
* 
 */

function validationLink(element) {
    if (element.getAttribute("rel") != "stylesheet") element.remove()
} 

/*
*
*   @name validationMeta
* 
*   @params item: object - DOMNode (<meta /> element)
*
*   @description  Function take Node and check does it "viewport" or "charset" meta data, if not- remove current Node.
*
*   @return undefined
* 
 */

function validationMeta(element) {
  if(
    !(
      element.hasAttribute('charset')
      ||
      element.getAttribute('name') == 'viewport'
      ||
      element.getAttribute('http-equiv') == 'content-type'
    )
  ) element.remove()
}

//DOM-Modifying<-SPECIFYED_ITEMS-Modifying<-METHODS 😂4:20😂

//DOM-Modifying<-SPECIFYED_ITEMS-Modifying 😂4:20😂

//DOM-Modifying<_________________________________________ATTRIBUTES-Modifying

/*
*
*   @name deleteAttributes
* 
*   @params element: object - DOMNode needes in modifying
*
*   @description  Function gets arrguments list of Node and call deleteAttribute for all item in list.
*
*   @return undefined
* 
 */

function deleteAttributes(element) {
  let attributes = element.attributes, counter = 0
  while(counter < attributes.length) {
    if( !deleteAttribute( attributes[counter].name, element) ) counter++
  }
} 
//DOM-Modifying<-ATTRIBUTES-Modifying<___________________SINGLE-ATTRIBUTE

/*
*
*   @name deleteAttribute
* 
*   @params attribute: string - attribute name (in lower case)
*           element: object - DOMNode needes in modifying
*
*   @description  Function check is arrgument allowed, if not remove argument from Node.
*
*   @return bool - Return true if attribute was removed.
* 
 */

function deleteAttribute(attribute, element) {
  if( !allowedAttributes.includes(attribute)) { //allowedAttributes is global array with names of allowed attributes.

    element.removeAttribute(attribute);
    return true
  }
  else return false
} 

//DOM-Modifying<-ATTRIBUTES-Modifying<-SINGLE-ATTRIBUTE 😂4:20😂

//DOM-Modifying<-ATTRIBUTES-Modifying 😂4:20😂

//DOM-Modifying 😂4:20😂