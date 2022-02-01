import { Module } from 'vuex'
import { IRootStore } from '../types'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0
    }
  },
  mutations: {
    changeGoodsList(state, goodList: any[]) {
      state.goodsList = goodList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.根据不同的情况发送不同的url请求
      const pageName: string = payload.pageName
      const pageUrl = `${pageName}/list`

      // const listResult = await getPageListData(pageUrl, payload.queryInfo)
      const listResult = {
        code: 0,
        data: {
          list: [
            {
              id: 183,
              name: '吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦',
              oldPrice: '43',
              newPrice: '30',
              desc: '吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/17f85e/180927_5i77e04lhaalbg3dai0j4588lbahh_640x960.jpg_560x999.jpg',
              inventoryCount: 6285,
              saleCount: 2,
              favorCount: 3,
              address: '天津',
              categoryId: 6,
              createAt: '2021-04-30T13:43:16.000Z',
              updateAt: '2021-04-30T13:43:16.000Z'
            },
            {
              id: 174,
              name: '2018秋季新款时尚套装蝴蝶结波点衬衫圆领麻花毛衣无袖马甲百褶半身裙中长款A字裙套装三件套',
              oldPrice: '86',
              newPrice: '60',
              desc: '2018秋季新款时尚套装蝴蝶结波点衬衫圆领麻花毛衣无袖马甲百褶半身裙中长款A字裙套装三件套',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/c45406/180131_1kgh02j1j4lbb74g0427ljk976612_640x960.jpg_560x999.jpg',
              inventoryCount: 4118,
              saleCount: 1356,
              favorCount: 311,
              address: '青岛',
              categoryId: 8,
              createAt: '2021-04-30T13:42:55.000Z',
              updateAt: '2021-04-30T13:42:55.000Z'
            },
            {
              id: 173,
              name: '时尚套装韩版气质甜美镂空灯笼袖针织衫百搭显瘦毛衣女2018秋季新款连衣裙套装',
              oldPrice: '70',
              newPrice: '70',
              desc: '时尚套装韩版气质甜美镂空灯笼袖针织衫百搭显瘦毛衣女2018秋季新款连衣裙套装',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/c45406/180822_5bl46cl4g934133a6cbhkk8l37hl0_640x960.jpg_560x999.jpg',
              inventoryCount: 1615,
              saleCount: 1360,
              favorCount: 286,
              address: '沈阳',
              categoryId: 3,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 171,
              name: '2018秋冬新款时尚韩范百搭显瘦背带裤套装灯芯绒裤子+毛衣两件套女',
              oldPrice: '99',
              newPrice: '69',
              desc: '2018秋冬新款时尚韩范百搭显瘦背带裤套装灯芯绒裤子+毛衣两件套女',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/55cf19/180831_3lccd4912aec0lb8fga9ji7ah6bkd_640x960.jpg_560x999.jpg',
              inventoryCount: 4339,
              saleCount: 1382,
              favorCount: 55,
              address: '南京',
              categoryId: 8,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 170,
              name: '2018秋装套装新款韩版百搭显瘦长袖条纹雪纺衬衫女宽松直筒背带裤套装两件套',
              oldPrice: '84',
              newPrice: '59',
              desc: '2018秋装套装新款韩版百搭显瘦长袖条纹雪纺衬衫女宽松直筒背带裤套装两件套',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/c45406/180312_5ebi8i8k389leic0g487h3l611kek_640x960.jpg_560x999.jpg',
              inventoryCount: 7966,
              saleCount: 1384,
              favorCount: 80,
              address: '西安',
              categoryId: 3,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 169,
              name: '时尚套装两件套网红同款2018秋装女套装新款学生牛仔外套配内搭温柔风小黑裙黑色v领吊带裙潮',
              oldPrice: '100',
              newPrice: '70',
              desc: '时尚套装两件套网红同款2018秋装女套装新款学生牛仔外套配内搭温柔风小黑裙黑色v领吊带裙潮',
              status: 1,
              imgUrl:
                'http://s3.mogucdn.com/mlcdn/c45406/180819_44ee3hf251agika4lji8958i46e6d_640x960.jpg_560x999.jpg',
              inventoryCount: 1281,
              saleCount: 1404,
              favorCount: 75,
              address: '青岛',
              categoryId: 7,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 168,
              name: '连衣裙女新款2018秋款韩版小碎花裙子长袖文艺学生百搭小黑裙',
              oldPrice: '97',
              newPrice: '68',
              desc: '连衣裙女新款2018秋款韩版小碎花裙子长袖文艺学生百搭小黑裙',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/c45406/170402_06ehihjk325cjc7jc4653k1bkek2b_640x960.jpg_560x999.jpg',
              inventoryCount: 7702,
              saleCount: 1416,
              favorCount: 441,
              address: '西安',
              categoryId: 5,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 167,
              name: '格姬2018秋装新款两件套圆领灯笼袖连衣裙春装新款韩版名媛大裙摆套装裙时尚套装女6254',
              oldPrice: '285',
              newPrice: '199',
              desc: '格姬2018秋装新款两件套圆领灯笼袖连衣裙春装新款韩版名媛大裙摆套装裙时尚套装女6254',
              status: 1,
              imgUrl:
                'http://s3.mogucdn.com/mlcdn/c45406/180302_4ji3hab7c3kdhfdg4i0lc86a1287h_640x960.jpg_560x999.jpg',
              inventoryCount: 2455,
              saleCount: 1416,
              favorCount: 62,
              address: '南京',
              categoryId: 7,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 166,
              name: '秋装2018新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙小个子显高时尚套装裙子三件套',
              oldPrice: '39',
              newPrice: '27',
              desc: '秋装2018新款牛仔外套女韩版宽松短款针织背心高腰半身裙中长裙小个子显高时尚套装裙子三件套',
              status: 1,
              imgUrl:
                'http://s3.mogucdn.com/mlcdn/c45406/180731_5be6jhh7ggj68d4063gkca4egh02i_750x1000.jpg_560x999.jpg',
              inventoryCount: 7012,
              saleCount: 1432,
              favorCount: 103,
              address: '昆明',
              categoryId: 8,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            },
            {
              id: 165,
              name: '2018秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮',
              oldPrice: '198',
              newPrice: '198',
              desc: '2018秋装女装韩版新款休闲时尚套装女圆领条纹薄款上衣+高腰束脚灯笼裤两件套女潮',
              status: 1,
              imgUrl:
                'http://s11.mogucdn.com/mlcdn/55cf19/180803_44ec95haiehdddjk126fgidfg52le_640x960.jpg_560x999.jpg',
              inventoryCount: 1582,
              saleCount: 1459,
              favorCount: 13,
              address: '重庆',
              categoryId: 5,
              createAt: '2021-04-30T13:42:54.000Z',
              updateAt: '2021-04-30T13:42:54.000Z'
            }
          ],
          totalCount: 142
        }
      }
      console.log(listResult)

      const { list, totalCount } = listResult.data
      // 设置不同的数据  首字符转成大写
      commit(
        `change${pageName.replace(/^\S/, (s) => s.toUpperCase())}List`,
        list
      )
      if (totalCount) {
        commit(
          `change${pageName.replace(/^\S/, (s) => s.toUpperCase())}Count`,
          totalCount
        )
      }
    }
  },
  getters: {
    pageListData(state): (pageName: string) => any {
      return (pageName: string) => {
        // 想要拼接 usersList 但是拼接的话，ts检测不通过，所以只能暂时转成any，然后再取
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state): (pageName: string) => any {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default systemModule
