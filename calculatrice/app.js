const calculateur = document.getElementById('calculateur')
const ecran = document.getElementById('ecran')
const response = document.getElementById('response')

isClick = JSON.parse(calculateur.getAttribute('data-first-click'))

calculateur.addEventListener('click',(event)=>{
    if (event.target.tagName === 'TD') {
            let valeur = event.target.textContent
            if (valeur === 'c') { 
                ecran.value = ''
            }else if(valeur.trim() != '='){
                
                if (isClick) {
                    ecran.value = valeur
                    isClick = false   
                }else
                    ecran.value += valeur  
            }
        }
})

response.addEventListener('click',()=>{
    ecran.value = eval(ecran.value)
})