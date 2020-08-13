import {
  request
} from './request.js';

export function getDetails(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

//将api中有用的数据进行整理，创建一个类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title; //产品名称
    this.desc = itemInfo.desc; //产品描述
    this.newPrice = itemInfo.price; //产品价格
    this.oldPrice = itemInfo.oldPrice; //原价
    this.discount = itemInfo.discountDesc; //产品折扣信息
    this.columns = columns; // 其他信息
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice; //真实价格
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}