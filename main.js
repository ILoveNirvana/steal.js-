//<______________________________________________________ON-START

/*
 *
 *   @name rewriteTitle
 *
 *   @description  Function ask user for new title.
 *
 *   @return undefined
 * 
 */

function rewriteTitle() { document.title = prompt('Enter new title') }

/*
 *
 *   @name setNoindex
 *
 *   @description  Function insert "noindex/nofollow" meta data to the page.
 *
 *   @return undefined
 * 
 */

function setNoIndex() { document.head.innerHTML += '<meta name="robots" content="noindex,nofollow">' }

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
    elements = function() {
        return document.body.querySelectorAll('*')
    }()
) {
    if (!state.cleaned) {


        deleteSpecifyedItems();

        const specifyedItems = [{
            type: "a",
            method: validationAnchor
        }, {
            type: "link",
            method: validationLink
        }, {
            type: "meta",
            method: validationMeta
        }]

        for (var i = specifyedItems.length - 1; i >= 0; i--) {

            validationSpecifyedItems(specifyedItems[i])

        }


        for (var i = elements.length - 1; i >= 0; i--) {

            deleteAttributes(elements[i])

        }
        state.cleaned = true;

    }

}

//ON-START<_________________________________________SPECIFYED_ITEMS-Deleting

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
    items = ['SCRIPT', 'IFRAME', 'NOSCRIPT', 'FORM', 'AUDIO', 'VIDEO']
) {
    for (var i = items.length - 1; i >= 0; i--) {
        let item = document.getElementsByTagName(items[i])
        for (var j = item.length - 1; j >= 0; j--) {
            item[j].remove()
        }
    }
}

//ON-START<-SPECIFYED_ITEMS-Deleting 😂4:20😂

//ON-START<_________________________________________SPECIFYED_ITEMS-Modifying

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

function validationSpecifyedItems(item) {
    let items = document.getElementsByTagName(item.type)
    for (var i = items.length - 1; i >= 0; i--) { item.method(items[i]) }
}

//ON-START<-SPECIFYED_ITEMS-Modifying<___________________METHODS

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
    if (!(
            element.hasAttribute('charset') ||
            element.getAttribute('name') == 'viewport' ||
            element.getAttribute('http-equiv') == 'content-type'
        )) element.remove()
}

//ON-START<-SPECIFYED_ITEMS-Modifying<-METHODS 😂4:20😂

//ON-START<-SPECIFYED_ITEMS-Modifying 😂4:20😂

//ON-START<_________________________________________ATTRIBUTES-Modifying

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

    let attributes = element.attributes,
        counter = 0

    while (counter < attributes.length) {

        if (!deleteAttribute(attributes[counter].name, element)) counter++

    }

}
//ON-START<-ATTRIBUTES-Modifying<___________________SINGLE-ATTRIBUTE

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

    const allowedAttributes = ['id', 'class', 'style', 'href', 'src']

    if (!allowedAttributes.includes(attribute)) {

        element.removeAttribute(attribute);
        return true

    } else return false

}

//ON-START<-ATTRIBUTES-Modifying<-SINGLE-ATTRIBUTE 😂4:20😂

//ON-START<-ATTRIBUTES-Modifying 😂4:20😂

//ON-START<___________________BACKGROUNDS-hack

/*
 *
 *   @name createBackgroundsHack
 * 
 *   @params items: array - Array with object which contains info about backgrounds.
 *
 *   @description  Function create hidden images on page for allow browser to download backgrounds in native way.
 *
 *   @return undefined
 * 
 */

function createBackgroundsHack(items = getListOfBackgroundImages()) {
    for (var i = items.length - 1; i >= 0; i--) {
        document.body.innerHTML += '<img src="' + items[i].src + '" style="display:none">'
    }
}

/*
 *
 *   @name getListOfBackgroundImages
 * 
 *   @params elements: object - DOM of page (only ELEMENTS).
 *
 *   @description  Function get all backgrounds images used on page without duplications.
 *
 *   @return array - Array with object which contains info about backgrounds.
 * 
 */

function getListOfBackgroundImages(
    elements = function() {
        return document.querySelectorAll('*')
    }()
) {

    let backgroundImagesSources = []

    for (var i = 0; i < elements.length; i++) {

        var backgroundImage = window.getComputedStyle(elements[i]).getPropertyValue("background-image")

        if ( backgroundImage != 'none' &&
            !backgroundImagesSources.includes(backgroundImage) &&
             backgroundImage.includes('url(') ) {

            var path = backgroundImage.slice(5, -2).split('/');

            backgroundImagesSources.push({

                url: "url('index_files/" + path[path.length - 1] + "')",

                src: path.join('/'),

                element: elements[i]

            })

        }

    }

    return backgroundImagesSources

}

//ON-START<-BACKGROUNDS-hack 😂4:20😂
//
//ON-START<___________________CONTACT-FORM-insert

/*
 *
 *   @name setForm
 *
 *   @description  Function insert contact form to the page.
 *
 *   @return undefined
 * 
 */

function setForm() {
    if (!state.formInserted) {
        document.body.innerHTML += `<div id=asa_ua_devdep-contact-form> <input id=asa_ua_devdep-show-form type=button class=asa_ua_devdep-button value="CONTACT US"/> <form id="asa_ua_devdep-form_contact" action="send.php" method="post"> <a href=# id=asa_ua_devdep-open-block-close title=close>x</a> <input id=asa_ua_devdep-name placeholder=Name required type="text"/> <br/> <input id=asa_ua_devdep-phone type=tel placeholder=Phone required/> <br/> <input id=asa_ua_devdep-email type=email placeholder=Email required/> <br/> <textarea cols=50 id=asa_ua_devdep-comment placeholder=Message... required rows=4></textarea> <br/> <input id=asa_ua_devdep-send_button type=submit class=button value=Send /> </form> <style>#asa_ua_devdep-contact-form{position:fixed;top:15%;right:3px;z-index:2147483647}#asa_ua_devdep-contact-form *{all:unset;font-family:Arial,Helvetica,sans-serif;max-width:100%}#asa_ua_devdep-contact-form script,#asa_ua_devdep-contact-form style{display:none}#asa_ua_devdep-contact-form .asa_ua_devdep-button{padding:5px 10px;border-radius:5px;color:#fff;font-weight:700;cursor:pointer}#asa_ua_devdep-contact-form #asa_ua_devdep-show-form{position:relative;right:-80%;border:none;background:red;opacity:1;font-size:13px}#asa_ua_devdep-contact-form #asa_ua_devdep-form_contact{box-sizing:border-box;opacity:0;width:480px;padding:10px;border-radius:5px;border:1px solid #000;background:#fff;transition:all .5s;display:block;z-index:2147483647}#asa_ua_devdep-contact-form #asa_ua_devdep-form_contact.show{opacity:1}#asa_ua_devdep-contact-form #asa_ua_devdep-comment,#asa_ua_devdep-contact-form input[type=email],#asa_ua_devdep-contact-form input[type=tel],#asa_ua_devdep-contact-form input[type=text]{padding:5px;border:2px solid #000;border-radius:5px;margin:5px;box-sizing:border-box;color:#818181}#asa_ua_devdep-contact-form #asa_ua_devdep-send_button{display:block;padding:5px 10px;border:2px solid #000;border-radius:5px;color:#fff;background:#000;font-weight:700;cursor:pointer;margin-left:78%}#asa_ua_devdep-contact-form #asa_ua_devdep-open-block-close{position:absolute;top:15px;right:-5px;width:24px;height:24px;text-decoration:none;text-align:center;border:2px solid #fff;background:#555;color:#fff;font:700 20px/20px verdana,sans-serif;border-radius:50%;box-shadow:0 2px 2px rgba(0,0,0,.5)}#asa_ua_devdep-contact-form #asa_ua_devdep-open-block-close:hover{background:#900;color:#fafafa}.open-block-close:hover{background:red}</style> <script>function show_field(){document.getElementById("asa_ua_devdep-form_contact").classList.contains("show")?(button_show.style.opacity="1",document.getElementById("asa_ua_devdep-form_contact").classList=""):(button_show.style.opacity="0",document.getElementById("asa_ua_devdep-form_contact").classList="show")}function delSub(e){e.preventDefault(),sendQuery()}function sendQuery(){var e={},t="";urlEncodedDataPairs=[],e.name=document.getElementById("asa_ua_devdep-name").value,e.phone=document.getElementById("asa_ua_devdep-phone").value,e.email=document.getElementById("asa_ua_devdep-email").value,e.comment=document.getElementById("asa_ua_devdep-comment").value,console.log(e);for(name in e)urlEncodedDataPairs.push(encodeURIComponent(name)+"="+encodeURIComponent(e[name]));t=urlEncodedDataPairs.join("&").replace(/%20/g,"+");var n=new XMLHttpRequest;n.open("POST","send.php"),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8"),n.send(t),n.onload=function(){show_field(),200!=n.status?$.alert.open("info","Sorry! :c","Something get wrong!"):$.alert.open("erorr","Thank you!","Thank you! We will answer to you soon as it possible!")}}var button_show=document.getElementById("asa_ua_devdep-show-form");button_show.addEventListener("click",show_field);var button_send=document.getElementById("asa_ua_devdep-form_contact");button_send.addEventListener("submit",delSub),document.getElementById("asa_ua_devdep-open-block-close").addEventListener("click",show_field)</script> </div>`;
        document.head.innerHTML += `<style>editable{background: rgba(0, 255, 0, .3);}</style><script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script><script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script><link href="http://appliance--clinic.com/alert/css/alert.css" rel="stylesheet"/><link href="http://appliance--clinic.com/alert/themes/default/theme.css" rel="stylesheet"/><script src="http://appliance--clinic.com/alert/js/alert.min.js"></script>`;
    }
    state.formInserted = true
}

//ON-START<-CONTACT-FORM-insert 😂4:20😂

//ON-START 😂4:20😂

//<______________________________________________________WHILE-PROCCESED

/*
 *
 *   @name switchEditionMode
 *
 *   @description  Function swithing background and browser content editing mode.
 *
 *   @return undefined
 * 
 */

function switchEditionMode() {
    let elements = document.body.querySelectorAll('*');
    if (document.getElementsByTagName('EDITABLE').length == 0) {
        for (var i = elements.length - 1; i >= 0; i--) {
            enableTextEdit(elements[i]);
        }
    } else {
        for (var i = elements.length - 1; i >= 0; i--) {
            disableTextEdit(elements[i]);
        }
    }
    switchBackgroundSources();
}

//WHILE-PROCCESED<____________________________________________BACKGROUNDS

/*
 *
 *   @name switchBackgroundSources
 * 
 *   @params items: array - Array with object which contains info about backgrounds.
 *
 *   @description  Function switch backgrounds from external styles for current page to absolutes path for downloaded page.
 *
 *   @return undefined
 * 
 */

function switchBackgroundSources(items = getListOfBackgroundImages()) {
    for (var i = items.length - 1; i >= 0; i--) {
        if (isBackgroundRewrired(items[i].element)) items[i].element.style.backgroundImage = '';
        else items[i].element.style.backgroundImage = items[i].url;
    }
    state.backgroundsRewrited = !state.backgroundsRewrited
}

/*
 *
 *   @name isBackgroundRewrired
 * 
 *   @params element: object - DOMNode to check.
 *
 *   @description  Function check in which state background now if is will work for downloaded web- return true.
 *
 *   @return boll
 * 
 */

function isBackgroundRewrired(element) {
    return element.style.backgroundImage.search("index_files") == -1 ? false : true;
}

//WHILE-PROCCESED<-BACKGROUNDS 😂4:20😂

//WHILE-PROCCESED 😂4:20😂

let state = {
    cleaned: false,
    backgroundsRewrited: false,
    formInserted: false,
    proccesed: false
};

function prepair() {
    nodeWalk()
    createBackgroundsHack()
    var tag = document.createElement("script");
tag.src = "https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=uoqzmquvnisi5q4f02q2wrkoe47wmc5pvb04s3hz8pqz8c31";
document.getElementsByTagName("head")[0].appendChild(tag);
document.body.innerHTML = `<div id="edit-control-buttons" style="position: absolute; top: 10px; right: 10px; z-index: 65536"><button onclick="tinymce.init({
  selector: '#edit-web',
  inline: true,
  theme: 'modern',
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
  ],
  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
  image_advtab: true,
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ]
   });">Edit On</button><button onclick="tinymce.remove()">Edit OFF</button></div><div id="edit-web">` + document.body.innerHTML + "</div>";
    setForm()
    rewriteTitle()
    setNoIndex()
}

function enableTextEdit(element) {
    let childNodes = element.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
        if (childNodes[i].nodeType == 3 && childNodes[i].nodeValue.match(/[a-zA-Z1-9]+/g) && element.nodeName != 'STYLE' && element.nodeName != 'SCRIPT') {
            let newNode = document.createElement('editable'),
                text = childNodes[i].nodeValue;
            element.replaceChild(newNode, childNodes[i]);
            newNode.innerText = text;
            //newNode.setAttribute('contenteditable', 'true');
        }
    }
    for (element of document.getElementsByTagName('EDITABLE')) {
        element.addEventListener('click', function(e) { e.preventDefault() })
    }
}

function disableTextEdit() {
    let items = document.body.getElementsByTagName('EDITABLE');
    for (var i = items.length - 1; i >= 0; i--) {
        items[i].outerHTML = items[i].outerHTML.replace('<editable contenteditable="true">', '').replace('</editable>', '');
    }
}

function deletingElementsModeSwitcher() {
    state.proccesed = !state.proccesed
    const styles = document.createElement('style')
    styles.setAttribute('id', 'delIsAct')
    styles.innerHTML = '*:hover{outline:rgba(255, 0, 0, .3) solid 3px;} *:active{outline:rgba(255, 0, 0, .9) solid 3px;}'
    const items = document.body.querySelectorAll('*')
    if (state.proccesed) {
        for (item of items) {
            item.addEventListener('click', deleteItem)
            document.head.appendChild(styles)
        }
    } else {
        for (item of items) {
            document.getElementById('delIsAct').remove()
        }
    }
}
const deleteItem = function(event) {
    event.preventDefault()
    if (state.proccesed) event.target.remove()
}


function download() {
    let zip = new JSZip()
    getStyleSheets(zip);
    getImages(zip);
    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            saveAs(content, "example.zip");
        })
}

function getStyleSheets(zip) {
    const styles = document.styleSheets;
    for (var i = styles.length - 1; i >= 0; i--) {
        let path = styles[i].ownerNode.href || false;
        if (path) {
            let content = axios.get(path)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
            console.log(content);
            zip.file('assets/css/' + path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.css') + 4), content)
        }
    }
    return zip;
}

function getImages(zip) {
    const images = document.images;
    for (var i = images.length - 1; i >= 0; i--) {
        let path = images[i].currentSrc || false;
        if (path) {
            let content = axios.get(path, { responseType: 'arraybuffer' })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.log(error, path);
                });
            console.log(content);
            zip.file('images/' + path.slice(path.lastIndexOf('/') + 1), content)
        }
    }
    return zip;
}

function test() {
    document.getElementById('edit-control-buttons').remove()
    document.body.innerHTML += document.getElementById('edit-web').innerHTML
    document.getElementById('edit-web').remove()
    document.querySelector('script[src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=uoqzmquvnisi5q4f02q2wrkoe47wmc5pvb04s3hz8pqz8c31"]').remove()
    switchBackgroundSources()
}
