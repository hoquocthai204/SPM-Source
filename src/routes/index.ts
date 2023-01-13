export default Object.freeze({
  WALLET: {
    DEPOSIT: {
      fiat: {
        thb: {
          route: '/my/fiat?type=v-depositHistory&tab=v-deposit&currency=THB',
        },
      },
      route: '/my/fiat?type=v-depositHistory&tab=v-deposit&currency=THB',
    },
    WITHDRAW: {
      fiat: {
        thb: {
          route: '/my/fiat?type=v-withdrawHistory&tab=v-withdraw&currency=THB',
        },
      },
    },
    MANAGE_ADDRESS_BOOK: {
      route: '/my/manage-address-book',
    },
  },
  DEPOSIT_WITHDRAW: {
    SHOW_MORE_HISTORY: {
      route: '/my/history/transaction',
    },
  },
});
