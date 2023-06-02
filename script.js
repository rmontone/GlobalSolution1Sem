document.querySelector("#salvar").addEventListener("click", cadastrar)


let lista_despesas = []


window.addEventListener("load", () => {
  lista_despesas = JSON.parse(localStorage.getItem("lista_despesas")) || []
  atualizar()
  
})

document.querySelector("#pendentes").addEventListener("click", ()=>{
  lista_despesas = JSON.parse(localStorage.getItem("lista_despesas")) || []
  atualizar()
  lista_despesas=lista_despesas.filter(despesa => despesa.concluida==false)
  atualizar()
})


document.querySelector("#busca").addEventListener("keyup", ()=>{
  lista_despesas = JSON.parse(localStorage.getItem("lista_despesas")) || []
  atualizar()
  const endereco = document.querySelector("#busca").value
  lista_despesas=lista_despesas.filter(despesa => despesa.endereco.includes(endereco))
  atualizar()
})

document.querySelector("#concluidas").addEventListener("click", ()=>{
  lista_despesas = JSON.parse(localStorage.getItem("lista_despesas")) || []
  atualizar()
  lista_despesas=lista_despesas.filter(despesa => despesa.concluida==true)
  atualizar()
})



function cadastrar() {
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let propriedade = document.querySelector("#propriedade").value
    let inquilino = document.querySelector("#inquilino").value
    let endereco = document.querySelector("#endereco").value
    let valor = document.querySelector("#valor").value
    let litros = document.querySelector("#litros").value
    let data = document.querySelector("#data").value
    const despesa = {
      
        id: Date.now(),
        propriedade,
        inquilino,
        endereco,
        valor,
        litros,
        data,
        concluida:false
    }
    if (despesa.propriedade.length == 0 || despesa.inquilino.length||despesa.endereco.length||despesa.valor.length||despesa.litros.length||despesa.data.length == 0 ){
      document.querySelector("#propriedade").classList.add("is-invalid")
      document.querySelector("#inquilino").classList.add("is-invalid")
      document.querySelector("#endereco").classList.add("is-invalid")
      document.querySelector("#valor").classList.add("is-invalid")
      document.querySelector("#litros").classList.add("is-invalid")
      document.querySelector("#data").classList.add("is-invalid")
      return
    }

 
    lista_despesas.push(despesa)
    document.querySelector("#despesas").innerHTML += gerarCard(despesa)
    document.querySelector("#propriedade").value=""
    document.querySelector("#inquilino").value=""
    salvar()
    modal.hide()
}

function atualizar(){
  document.querySelector("#despesas").innerHTML = ""
  lista_despesas.forEach((despesa)=> {
    document.querySelector("#despesas").innerHTML += gerarCard(despesa)
  })
}


function salvar(){

  localStorage.setItem("lista_despesas", JSON.stringify(lista_despesas))

}
function apagar(id){
  lista_despesas=lista_despesas.filter((despesa) => {
    return despesa.id != id
   
  }) //arrow function
  salvar()
  atualizar()
}

function concluir(id){
  let despesa_encontrada=lista_despesas.find((despesa) => {
    return despesa.id == id
  })
  despesa_encontrada.concluida = true
  salvar()
  atualizar()
}

function gerarCard(despesa) {
  const disabled = (despesa.concluida) ? "disabled" : ""
    return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card">
    <div class="card-header">
      ${despesa.endereco}
    </div>
    <div class="card-body">
      <p class="card-text"> Inquilino: ${despesa.inquilino}</p>
      <p>
        <p class="card-text"> Endereço: ${despesa.endereco}</p>
      </p>
      <p>
      <span class="badge text-bg-warning">${despesa.propriedade}</span>
    </p>
      <p> Valor da conta: R$${despesa.valor}</p>
      <p> Valor em litros: ${despesa.litros} litros </p>
      <p> Data de vecimento: ${despesa.data}</p>
      <a href="#" onClick='concluir(${despesa.id})' class="btn btn-success ${disabled}">
        <i class="bi bi-check-lg"></i>
      </a>
      <a href="#" onClick='apagar(${despesa.id})' class="btn btn-danger">
        <i class="bi bi-x-circle"></i>
      </a>
    </div>
  </div>
  </div>`
}