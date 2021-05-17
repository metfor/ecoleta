document.querySelector("select[uf]")
document.addEventListener("change",getCities)

function populeteUFs(){
    const citySelect=document.querySelector("select[name=city]")
    const ufSelect=document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())  
    .then(states=>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}<option>`
        }
        citySelect.innerHTML="<option value>Selecione a Cidade<option>"
    citySelect.disabled=true    
        
        
    })
}

populeteUFs()    


function getCities(event){
    const citySelect=document.querySelector("select[name=city]")
    const ufValue = event.target.value
    
    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
   
    fetch(url)
    .then(res => res.json())  
    .then(cities=>{
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}<option>`

        }
        citySelect.disabled=false
    })
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems=[]
const itemsToCollecet = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollecet){
    item.addEventListener("click", handleSelectedItem) 
}

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = itemLi.dataset.id
    itemLi.classList.toggle("selected")
const alreadySelected=selectedItems.findIndex(item =>{
    const itemFound = item === itemId
    return itemFound
})
if(alreadySelected>=0){
    const filteredItems= selectedItems.filter(item=>{
        const itemIsDifferent =item !=itemId
        return itemIsDifferent
    })
    selectedItems= filteredItems
}else{
    selectedItems.push(itemId)
}
collectedItems.value=selectedItems
}


    


