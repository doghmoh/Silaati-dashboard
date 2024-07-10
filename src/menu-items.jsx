const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'CRM',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Customers',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Retailers',
              type: 'item',
              url: '/retailers'
            },
            {
              id: 'badges',
              title: 'Suppliers',
              type: 'item',
              url: '/suppliers'
            },
            {
              id: 'breadcrumb',
              title: 'Company',
              type: 'item',
              url: '/company'
            }
          ]
        },
        {
          id: 'component',
          title: 'Orders',
          type: 'item',
          icon: 'feather icon-box',
          url: '/orders'
        },
        {
          id: 'component',
          title: 'Products',
          type: 'item',
          icon: 'feather icon-box',
          url: '/products'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'Settings',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Profile',
          type: 'item',
          icon: 'feather icon-box',
        },
        {
          id: 'component',
          title: 'Authentification',
          type: 'item',
          icon: 'feather icon-box',
        }
      ]
    },
  ]
};

export default menuItems;
