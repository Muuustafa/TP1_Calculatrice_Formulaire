let mail = document.getElementById('mail') 
var nomInput = document.getElementById('nom')
const table = document.getElementById('table') 
var dateInput = document.getElementById('date')
var prenomInput = document.getElementById('prenom')
const generer =  document.getElementById('generer') 
const nomInvalid = document.getElementById('nomInvalid') 
const enregistrer = document.getElementById('enregistrer') 
const dateInvalid = document.getElementById('dateInvalid') 
const mailInvalid = document.getElementById('mailInvalid') 
const prenomInvalid = document.getElementById('prenomInvalid') 
var noms = ''
var prenoms = ''
var dates = ''
var mails = ''
let cpt = 0
$(document).ready(function() {
    var table = $('#tableBody').DataTable({
        paging: true, 
        pageLength: 3 
        
    }); 
        function addRow() {
            noms = nomInput.value
            prenoms = prenomInput.value
            dates = dateInput.value
            mails = mail.value
            table.row.add([
                ++cpt,
                prenomInput.value,
                nomInput.value,
                dateInput.value,
                mail.value,
                '<button id="btn_modify" class="bi bi-pen-fill  btn btn-warning mx-1" onclick="modify(this)"> <button id="supprimer" class="btn btn-danger bi bi-trash" data-action="remove"></button>' 
            ]).draw(false); 
        }
        
    function updateRow(rowId) {
        rowId = cpt-1
        var newData = [
        cpt, 
        prenomInput.value, 
        nomInput.value, 
        dateInput.value, 
        mail.value, 
        '<button id="btn_modify" class="bi bi-pen-fill  btn btn-warning mx-1" onclick="modify(this)"> <button id="supprimer" class="btn btn-danger bi bi-trash" data-action="remove"></button>' 
    ];
        console.log(newData);
       table.row(rowId).data(newData).draw();
        enregistrer.innerText = 'Enregistrer' 
        enregistrer.classList.remove('btn-warning')
        enregistrer.classList.add('btn-primary')
        empty()
    }
    

    $('#enregistrer').click(function() {
        if (enregistrer.textContent == 'Enregistrer') {
            addRow()
            empty()
        }else{
            updateRow(cpt-1)
        }
        activate()        
    });
    $(document).on('click', '[data-action="remove"]', function(event) {
        let button = $(this);
        let verify = confirm('voulez-vous supprimer ?');
        if (verify) {
            let row = $(button).closest('tr');
            let rowId = table.row(row).index();
            table.row(rowId).remove().draw();
        }
    });
});
function empty() {
    nomInput.value = ""
    prenomInput.value = ""
    dateInput.value = ""
    mail.value = ""
}

function generate() {

    if (prenomInput.value.trim() != '' && nomInput.value.trim() != '' && dateInput.value.trim() != ''){
        let nom = nomInput.value.substring(0,2)
        let prenom = prenomInput.value[0]
        mail.value = prenom + nom + new Date().getFullYear() + '@groupeisi.com'
    }
    verification()
}

function verification() {
    if(verifyDate()){
        verifyDate()
    }
    if(!verifyLastName()){
        verifyLastName()
    }

    if(!verifyFirstName()){
        verifyFirstName()
    }
    if (!verifyMail()) {
        verifyMail()
    }
    if (verifyDate() && verifyFirstName() && verifyLastName() && verifyMail()){
        activate()
        return true
    }
    enregistrer.setAttribute('disabled','')
}
function activate() {
    if (prenomInput.value.trim() == '' || nomInput.value.trim() == '' || dateInput.value.trim() == ''){
        enregistrer.setAttribute('disabled','')
        generer.setAttribute('disabled','')
        return false
    }
    enregistrer.removeAttribute('disabled')
    generer.removeAttribute('disabled')
    return true
}

function modify(cpt) {
    mail.value = mails 
    nomInput.value = noms
    dateInput.value = dates
    prenomInput.value = prenoms
    enregistrer.innerText = 'Modifier' 
    enregistrer.classList.remove('btn-primary')
    enregistrer.classList.add('btn-warning')
    activate()
}

function verifyFirstName(){
    if (nomInput.value.trim() == '') {
        nomInvalid.removeAttribute('hidden')
        nomInput.style.borderColor = 'red'
        return false
    }else{
        nomInvalid.setAttribute('hidden','')
        nomInput.style.borderColor = 'gray'
        return true
    }
}

function verifyLastName() {
    if (prenomInput.value.trim() == '') {
        prenomInvalid.removeAttribute('hidden')
        prenomInput.style.borderColor = 'red'
        return false
    }else{
        prenomInvalid.setAttribute('hidden','')
        prenomInput.style.borderColor = 'gray'
        return true
    }
}

function verifyDate() {
    if (dateInput.value.trim() == '') {
        dateInvalid.removeAttribute('hidden')
        dateInput.style.borderColor = 'red'
        return false
    }else{
        dateInvalid.setAttribute('hidden','')
        dateInput.style.borderColor = 'gray' 
       generer.removeAttribute('disabled')
        return true
    }
}

function verifyMail() {
    if (mail.value == '') {
        mailInvalid.removeAttribute('hidden')
        mail.style.borderColor = 'red'
        return false
    }
    else {
        mailInvalid.setAttribute('hidden','hidden')
        mail.style.borderColor = 'gray'
        return true
    }
}



