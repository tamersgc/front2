

const addButton = document.querySelector('#add-aluno button')

addButton.onclick = async () => {
    const inputNome = document.querySelector('#input-nome')
    const inputEmail = document.querySelector('#input-email')

    const data = {
        title: inputNome.value,
        description: inputEmail.value
    }

    const response = await fetch("http://localhost:3333/projetos/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    });

    loadPage()

}

function updatePage(data) {

    const tbody = document.querySelector('table tbody')

    cleanPage()

    data.forEach(aluno => {
        const linha = createRow()

        linha.querySelector('.aluno-nome p').textContent = aluno.title;
        linha.querySelector('.aluno-email p').textContent = aluno.description;


        linha.querySelector('.delete-aluno').onclick = () => {
            deleteAluno(aluno)
        }

        tbody.append(linha)
    })

}

async function deleteAluno(aluno) {

    const newUrl = "http://localhost:3333/projetos/" + aluno.id

    const response = await fetch(newUrl, {
        method: "DELETE"
    });

    loadPage();

}

function createRow() {
    const tr = document.createElement('tr')

    const data = `
            <td class="aluno-nome">
                <p>Joao</p>  
            </td>
            <td class="aluno-email">
                <p>joao@email.com</p>
            </td>
            <td>
                <button class="delete-aluno">Remover</button>
            </td>
        `;
    tr.innerHTML = data

    return tr;

}

function cleanPage() {

    const tbody = document.querySelector('table tbody')

    tbody.querySelectorAll('tr').forEach((tr) => {
        tr.remove()
    });

}

async function loadPage() {

    const response = await fetch("http://localhost:3333/projetos");

    const data = await response.json();

    updatePage(data);

}

loadPage()


