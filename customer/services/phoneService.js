export class Service {
    getPhones = async () => {
      try {
        const res = await axios({
          url: 'https://6204afb3c6d8b20017dc3656.mockapi.io/Products',
          method: 'GET',
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `https://6204afb3c6d8b20017dc3656.mockapi.io/Products/${id}`,
          method: 'GET',
        });
  
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  }
  