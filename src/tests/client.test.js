import {getData} from '../client/js/fetchUtil';

it('test spinner toggle function', async () => {
  const url = `http://localhost:3000/search?dest='Paris'&dDate='12/12/2019'&rDate='01/01/2020'`;
  getData(url).then((response) => {
    expect(response.status).toEqual(200);
  });
});
