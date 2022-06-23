import {
  CREATE_EQUIPMENT,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  UPDATE_EQUIPMENT,
} from '../util/urls';
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
  equipamento,
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
      model: equipamento,
      pronto: false,
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
async function updateEquipment(
  id,
  brand,
  entregue,
  defect_for_repair,
  preco,
  aparelhoEntregue,
  equipamento,
  pronto,
) {
  await axios({
    method: 'post',
    url: UPDATE_EQUIPMENT,
    headers: {
      'Content-type': 'application/json',
    },
    data: {
      id: id,
      brand: brand,
      entregue: entregue,
      defect_for_repair: defect_for_repair,
      cost_value: preco,
      model: equipamento,
      serial: '',
      pronto: pronto,
    },
  }).then(response => {
    console.log();
  });
}

export {createNewClient, createNewEquipment, updateCliente, updateEquipment};
