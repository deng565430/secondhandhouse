const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const Details = (resolve) => {
  import('components/details/details').then((module) => {
    resolve(module)
  })
}

const AddProject = (resolve) => {
  import('components/addProject/addProject').then((module) => {
    resolve(module)
  })
}

const SearchList = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const MyProjectList = (resolve) => {
  import('components/projectlist/projectlist').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/',
    component: RecommendList
  }, {
    path: '/recommend',
    component: RecommendList,
    name: 'recommendList'
  }, {
    path: '/addproject',
    name: 'addproject',
    component: AddProject
  }, {
    path: '/detail',
    name: 'detail',
    component: Details
  }, {
    path: '/search',
    name: 'search',
    component: SearchList
  }, {
    path: '/projectlist',
    name: 'projectlist',
    component: MyProjectList
  }
]
