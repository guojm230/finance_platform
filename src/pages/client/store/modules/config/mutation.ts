
import {resolveStaticPath} from "@/global/utils"

const mutations = {
  commitHome(state,home){
    //主背景图
    if (home.mainItem) {
      home.style.main.backgroundImage =
          'url('+ resolveStaticPath(home.mainItem.path)+')';
    }
    //设置背景图
    home.style.huge.backgroundImage =
        'url('+ resolveStaticPath(home.hugeItem.path)+')';

    home.carouselItems.forEach(item =>{
      item.path = resolveStaticPath(item.path);
    });

    state.home = home;
  }
};


export default mutations;

