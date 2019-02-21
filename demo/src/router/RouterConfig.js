export default [{
    path: '/',
    exact: true,
    page: () => { return import('../component/Welcome'); },
}, {
    path: '/guide',
    exact: true,
    page: () => { return import('../component/pages/components/Home/Page'); },
}, {
    path: '/test',
    exact: true,
    page: () => { return import('../component/pages/components/AppBar/Page'); },
}, {
    path: '/testservice',
    exact: true,
    page: () => { return import('../component/pages/components/Test/Page'); },
}];
