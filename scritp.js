document.addEventListener("DOMContentLoaded", () => {
    atualizarTela();
});

function mostrarTela(tela) {
    document.getElementById("cadastro").style.display = tela === "cadastro" ? "block" : "none";
    document.getElementById("lista").style.display = tela === "lista" ? "block" : "none";
}
function ativarMenu(botao) {
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    botao.classList.add("active");
}

function adicionarAluno() {
    let nome = document.getElementById("nome").value.trim();
    let n1 = parseFloat(document.getElementById("n1").value);
    let n2 = parseFloat(document.getElementById("n2").value);
    let n3 = parseFloat(document.getElementById("n3").value);

    
    if (!nome || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        alert("Preencha todos os campos!");
        return;
    }

    if (n1 < 0 || n2 < 0 || n3 < 0 || n1 > 10 || n2 > 10 || n3 > 10) {
        alert("Notas devem ser entre 0 e 10!");
        return;
    }

    let media = (n1 + n2 + n3) / 3;
    let status = media >= 7 ? "Aprovado" : "Reprovado";

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunos.push({
        nome,
        n1,
        n2,
        n3,
        media: media.toFixed(2),
        status
    });

    localStorage.setItem("alunos", JSON.stringify(alunos));

    limparCampos();
    atualizarTela();
    mostrarTela("lista");
}

function atualizarTela() {
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    let aprovados = 0;
    let reprovados = 0;

    alunos.forEach(a => {
        let tr = document.createElement("tr");

        if (a.status === "Aprovado") aprovados++;
        else reprovados++;

        tr.innerHTML = `
            <td>${a.nome}</td>
            <td>${a.n1}, ${a.n2}, ${a.n3}</td>
            <td>${a.media}</td>
            <td class="${a.status === "Aprovado" ? "aprovado" : "reprovado"}">
                ${a.status}
            </td>
        `;

        tabela.appendChild(tr);
    });

    document.getElementById("totalAlunos").innerText = alunos.length;
    document.getElementById("aprovados").innerText = aprovados;
    document.getElementById("reprovados").innerText = reprovados;
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("n1").value = "";
    document.getElementById("n2").value = "";
    document.getElementById("n3").value = "";
}

function limpar() {
    if (confirm("Deseja apagar todos os dados?")) {
        localStorage.removeItem("alunos");
        atualizarTela();
    }
}