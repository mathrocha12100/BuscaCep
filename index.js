function getCep() {
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const street = document.getElementById("streetName").value;
    if (!city || !street) {
        return alert('Preencha os Dados');
    }
    if (city.length < 3 || street.length < 3) {
        return alert('Os campos Cidade ou Rua precisam ter no minimo 3 letras');
    } 
    const tableAlreadyExist = document.getElementById('tableExists');
    if (tableAlreadyExist) {
        return alert('Limpe os dados antes');
    }
    $.get(`https://viacep.com.br/ws/${state}/${city}/${street}/json`, (data, status) => {
        $('thead').append(`<tr id="tableExists">>
            <th>CEP</th>
            <th>LOGRADOURO</th>
            <th>COMPLEMENTO</th>
            <th>BAIRRO</th>
            <th>LOCALIDADE</th>
        </tr>`);
        this.data = data;
        data.map(local => {
            const { cep, logradouro, complemento, bairro, localidade } = local;
            $("tbody").append(`<tr id="tableExists"><td>${cep}</td><td>${logradouro}</td>
                <td>${complemento ? complemento : 'Não possui'}</td><td>${bairro}</td><td>${bairro}</td>${localidade}</tr>`);
        });
    });   
}

function resetTable() {
    const tableAlreadyExist = document.getElementById('tableExists');
    if (!tableAlreadyExist) {
        return alert('Tabela de dados não existe!');
    }
    document.getElementById('tableExists').remove(); // remove o cabeçalho    
    for (let i in this.data) {
        document.getElementById('tableExists').remove(); // remove as colunas
    }
    this.data = [];
}