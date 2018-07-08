describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function () {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('formate the selectedItems', () => {
    let inputs = ["ITEM0013 x 4"];
    let expected = [{
      id: "ITEM0013",
      count: 4
    }, ]
    expect(formatSelectedItems(inputs)).toEqual(expected)
  });

  it('get each dishes info', () => {
    let inputs = [{
      id: "ITEM0013",
      count: 4
    }, ]
    const allItemsInfo = loadAllItems()
    let expected = [{
      id: "ITEM0013",
      name: '肉夹馍',
      price: (6.00).toFixed(2),
      count: 4
    }, ]
    expect(getEachdishesInfo(inputs, allItemsInfo)).toEqual(expected)
  });

  it('calculate each dishes subtotal', () => {
    let inputs = [{
      id: "ITEM0013",
      name: '肉夹馍',
      price: (6.00).toFixed(2),
      count: 4
    }, ]
    const promotions = loadPromotions()
    const expected = [{
      dishesItem: {
        id: "ITEM0013",
        name: '肉夹馍',
        price: (6.00).toFixed(2),
        count: 4
      },
      subtotal: (24.00).toFixed(2)
    }]
    expect(calculateEachdishesSubtotal(inputs)).toEqual(expected)
  });

  it('each 30 cut 6', () => {
    let inputs = [{
      id: "ITEM0013",
      name: '肉夹馍',
      price: (6.50).toFixed(2),
      count: 5
    }, ]
    let expected = 26.5
    expect(promotionOfEach30cut6(inputs)).toEqual(expected)
  });

  it('some half price', ()=>{
    let inputs = [{
      id: "ITEM0013",
      name: '肉夹馍',
      price: (6.00).toFixed(2),
      count: 5
    }, ]
    let promotions = ['ITEM0001', 'ITEM0013']
    let expected = 15

    expect(promotionOfHalfPrice(inputs, promotions)).toEqual(expected)
  });

});
