import {CREATE_EQUIPMENT, CREATE_CLIENT, UPDATE_CLIENT} from '../util/urls';
import axios from 'axios';
async function createNewClient(name, email, cpf, telefone) {
  var idClient;
  await axios({
    method: 'post',
    url: CREATE_CLIENT,
    headers: {
      'Content-type': 'application/json',
    },
    data: {
      name: name,
      email: email,
      cpf: cpf,
      telefone: telefone,
    },
  }).then(response => {
    idClient = response.data.id;
  });

  return idClient;
}

async function createNewEquipment(
  idClient,
  brand,
  entregue,
  defect_for_repair,
  preco,
  aparelhoEntregue,
) {
  await axios({
    method: 'post',
    url: CREATE_EQUIPMENT,
    headers: {
      'Content-type': 'application/json',
    },
    data: {
      idClient: idClient,
      brand: brand,
      entregue: aparelhoEntregue,
      defect_for_repair: defect_for_repair,
      preco: preco,
      model: '',
    },
  });
}

async function updateCliente(id, name, email, cpf, telefone) {
  var idClient;
  await axios({
    method: 'post',
    url: UPDATE_CLIENT,
    headers: {
      'Content-type': 'application/json',
    },
    data: {
      id: id,
      name: name,
      email: email,
      cpf: cpf,
      telefone: telefone,
    },
  }).then(response => {
    idClient = response.data.id;
    console.log();
  });
  alert('Formulário editado com sucesso!');
  return idClient;
}
export {createNewClient, createNewEquipment, updateCliente};
