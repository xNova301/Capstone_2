document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    //Prevent right click
  }, false);
  document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
      // Prevent F12 
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      // Prevent Ctrl+Shift+I 
      return false;
    }
  }
  
  
  
  
  
  
  const getEle = (id) => document.getElementById(id);
  const resetForm = (formId) => getEle(formId).reset();
  
  import { CustomModal, Helper } from './utis.js';
  import { Services } from '../services/phoneService.js';
  import { Validate } from './validate.js';
  import { Phone } from '../model/phone.js';
  
  const helper = new Helper();
  const service = new Services();
  const validate = new Validate();
  
  const renderList = async () => {
    const phoneList = await service.getPhones();
    let content = '';
    phoneList.forEach((ele) => {
      content += ` <tr>
      <td>${ele.id}</td>
      <td><strong>${ele.name}</strong></td>
      <td>$${ele.price}</td>
      <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
      <td>${ele.desc}</td>
      <td class = ''style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
      data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id='btnEdit'>
      Edit<i class="fa fa-pencil-square ms-2"></i>
      </button><button class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
      Delete <i class="fa fa-trash ms-2"></i>
      </button></td>
      </tr>`;
    });
    getEle('tablePhone').innerHTML = content;
  };
  
  window.onload = async () => renderList();
  
  getEle('addPhoneForm').onclick = () => {
    helper.clearTB();
    getEle('btnUpdate').style.display = 'none';
    getEle('btnAddPhone').style.display = 'inline-block';
  };
  
  getEle('btnAddPhone').onclick = async () => {
    const phoneList = await service.getPhones();
    if (!validate.isValid(phoneList)) return;
  
    const inputs = helper.getInputValue();
    let phone = new Phone('', ...inputs);
    await service.addPhone(phone);
    renderList();
    resetForm('formPhone');
    CustomModal.alertSuccess('Add phone successfully');
  };
  
  window.btnDelete = async (id) => {
    let res = await CustomModal.alertDelete(
      `This phone will be deleted, you can't undo this action`
    );
    if (res.isConfirmed) {
      await service.deletePhone(id);
      renderList();
      CustomModal.alertSuccess(`Delete phone successfully`);
    }
  };
  
  window.btnEdit = async (id) => {
    helper.clearTB();
    getEle('btnUpdate').style.display = 'inline-block';
    getEle('btnAddPhone').style.display = 'none';
  
    let data = await service.getPhoneById(id);
    let arrObjValue = Object.keys(data).map((k) => data[k]);
    arrObjValue.pop(); // Remove id from array
    helper.fill(arrObjValue); // fill the form with values
  
    getEle('btnUpdate').onclick = async () => {
      const phoneList = await service.getPhones();
      if (!validate.isValid(phoneList, true)) return;
  
      const inputs = helper.getInputValue();
      let phone = new Phone(id, ...inputs);
      await service.updatePhone(phone);
      renderList();
      CustomModal.alertSuccess('Update phone successfully');
    };
  };
  