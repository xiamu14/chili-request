import chiliReqBase from '../src';

const chiliReq = chiliReqBase({
  baseURL:
    'https://nei.netease.com/api/apimock/f0707cd671ff42b9548878c41fb9a744',
  interceptorRes: (response: any) => {
    response.data = {
      code: '0',
      msg: '0',
      data: {
        name: 'nick',
      },
    }
    return response;
  },
});

function getTransAmountCurve(data: { page: number; size: number }) {
  return {
    option: {
      method: 'GET',
      url: '/getUserList',
      data,
    },
  };
}

interface Res {
  code: string;
  msg: string;
  data: Record<string, string>;
}

// NOTE: test suite
test('api', () => {
  return chiliReq<Res>(getTransAmountCurve({ page: 1, size: 10 })).then(res => {
    expect(res).toEqual({
      code: '0',
      msg: '0',
      data: {
        name: 'nick',
      },
    });
  });
});
