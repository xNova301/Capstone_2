export class Service {
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
    getPhoneById = async (id) => {
      try {
        const res = await axios({
          url: `https://65efc71eead08fa78a50eda9.mockapi.io/Phone/${id}`,
          method: 'GET',
        });
  
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  }
  