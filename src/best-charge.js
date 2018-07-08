function bestCharge(selectedItems) {
  const allItemsInfo = loadAllItems()
  const allpromotionItems = loadPromotions()

  let formatedSelectedItems = formatSelectedItems(selectedItems)
  // console.info(formatedSelectedItems)
  let dishesItems = getEachdishesInfo(formatedSelectedItems, allItemsInfo)
  // console.info(dishesItems)
  let orderDetailItems = calculateEachdishesSubtotal(dishesItems, allpromotionItems)
  // console.info(orderDetailItems)
  let discountItems = getEachdishesDiscount(dishesItems, allpromotionItems)
  console.info(discountItems)
  let total = calculateTotalMoney(orderDetailItems, discountItems)
  // console.info(total)

  let orderDetailString = ''
  for (const orderDetailItem of orderDetailItems) {
    orderDetailString += `${orderDetailItem.dishesItem.name} x ${orderDetailItem.dishesItem.count} = ${orderDetailItem.subtotal}元\n`
  }
  
  let discountString = ''
  if (discountItems.type === '指定菜品半价') {
    discountString += '使用优惠:\n'
    discountString += `${discountItems.type}(`
    discountString += `${discountItems.discountDishesItems[0]}`
    for (let index = 1; index < discountItems.discountDishesItems.length; index++) {
      const element = discountItems.discountDishesItems[index];
      discountString += `，${element}`
    }
    discountString += `)，省${discountItems.saveMoney}元
-----------------------------------`
  }
  else if (discountItems.type === '满30减6元') {
    discountString += '使用优惠:\n'
    discountString += `${discountItems.type}，省${discountItems.saveMoney}元
-----------------------------------`
  }

  let receiptString = `============= 订餐明细 =============
${orderDetailString}
-----------------------------------
${discountString}
总计：${total}元
===================================`
  // console.info(receiptString)
  // console.info(orderDetailString)
  // console.info(discountString)

  /*
  ============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================
  */

  return receiptString;
}

function formatSelectedItems(selectedItems) {
  let formatedSelectedItems = []
  for (const selectedItem of selectedItems) {
    let [id, count] = selectedItem.split(" x ")
    formatedSelectedItems.push({
      id,
      count: parseInt(count)
    })
  }
  return formatedSelectedItems
}

function getEachdishesInfo(formatedSelectedItems, allItemsInfo) {
  let dishesItems = []
  for (const selectedItem of formatedSelectedItems) {
    for (const itemInfo of allItemsInfo) {
      if (selectedItem.id === itemInfo.id) {
        let {
          id,
          name,
          price
        } = itemInfo
        dishesItems.push({
          id,
          name,
          price: parseFloat(price),
          count: selectedItem.count
        })
        break;
      }
    }
  }
  return dishesItems
}

function calculateEachdishesSubtotal(dishesItems) {
  let orderDetailItems = []
  for (const dishesItem of dishesItems) {
    orderDetailItems.push({
      dishesItem: dishesItem,
      subtotal: parseFloat(dishesItem.price * dishesItem.count)
    })
  }
  return orderDetailItems
}

function getBestPromotionTypeAndSavemoney(dishesItems, type, promotionItems) {
  switch (type) {
    case '满30减6元':
      return promotionOfEach30cut6(dishesItems)
    case '指定菜品半价':
      return promotionOfHalfPrice(dishesItems, promotionItems)
  }
}

function promotionOfEach30cut6(dishesItems) {
  let total = 0
  for (const dishesItem of dishesItems) {
    total += dishesItem.price * dishesItem.count
  }
  return [dishesItems.map((item) => item.name), parseInt(total / 30) * 6]
}

function promotionOfHalfPrice(dishesItems, promotionItems) {
  let total = 0
  let discountItems = []
  for (const dishesItem of dishesItems) {
    for (const promotionItem of promotionItems) {
      if (promotionItem === dishesItem.id) {
        discountItems.push(dishesItem.name)
        total += parseFloat(dishesItem.price * dishesItem.count) / 2
      }
    }
  }
  return [discountItems, total]
}


function getEachdishesDiscount(dishesItems, allPromotionItems) {
  let discountItems = {}
  let discountDishesItems = []
  let bestPromotionType
  let maxSaveMoney = 0
  for (const promotionItem of allPromotionItems) {
    let [items, saveMoney] = getBestPromotionTypeAndSavemoney(dishesItems, promotionItem.type, promotionItem.items)
    if (saveMoney > maxSaveMoney) {
      maxSaveMoney = saveMoney
      bestPromotionType = promotionItem.type
      discountDishesItems = items
    }
  }
  discountItems.type = bestPromotionType
  discountItems.discountDishesItems = discountDishesItems
  discountItems.saveMoney = maxSaveMoney
  // console.info(discountItems)
  return discountItems
}

function calculateTotalMoney(orderDetailItems, discountItems) {
  let total = 0
  for (const orderDetailItem of orderDetailItems) {
    total += parseFloat(orderDetailItem.subtotal)
  }
  return total - discountItems.saveMoney

}
