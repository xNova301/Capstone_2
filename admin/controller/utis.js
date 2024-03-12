let getEle = (id) => document.getElementById(id);
export class Helper {
  inpArr = ['name', 'price', 'screen', 'backCam', 'frontCam', 'img', 'desc', 'type'];
  tbArr = [
    'tbname',
    'tbprice',
    'tbscreen',
    'tbbackCam',
    'tbfrontCam',
    'tbimg',
    'tbdesc',
    'tbtype',
  ];

  getInputValue() {
    return this.inpArr.map((ele) => getEle(ele).value);
  }
  fill(arr) {
    let fields = this.inpArr.map((ele) => getEle(ele));
    fields.forEach((ele, id) => {
      ele.value = arr[id];
    });
  }
  clearTB() {
    let fields = this.tbArr.map((ele) => getEle(ele));
    fields.forEach((ele) => {
      ele.innerHTML = '&#8205';
    });
  }
}

export class CustomModal {
  static alertSuccess = (message) => {
    return Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  static alertDelete = (message) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    });
  };
}
