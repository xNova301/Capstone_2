export class Services {
    getPhones = async () => {
      try {
        const res = await axios({
          url: 'https://65efc71eead08fa78a50eda9.mockapi.io/Phone',
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  
    addPhone = async (phone) => {
      try {
        await axios({
          url: 'https://65efc71eead08fa78a50eda9.mockapi.io/Phone',
          method: 'POST',
          data: phone,
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    deletePhone = async (id) => {
      try {
        await axios({
          url: `https://65efc71eead08fa78a50eda9.mockapi.io/Phone/${id}`,
          method: 'DELETE',
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `  /${id}`,
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  
    updatePhone = async (phone) => {
      try {
        await axios({
          url: `https://65efc71eead08fa78a50eda9.mockapi.io/Phone/${phone.id}`,
          method: 'PUT',
          data: phone,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  