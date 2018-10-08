const test={
  state:{
    a:0,
  },
  getters:{
    bst(state){
      return state.a;
    }
  },
  mutations:{
    TEST_A:(state,data)=>{
      state.bst=data;
    }
  },
  actions:{
    TEST_TEST({commit},data){
      commit('TEST_A',data)
    }
  }
};
export default test;
