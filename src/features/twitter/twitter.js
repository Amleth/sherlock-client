export const getTweetUserAndId = _ => {
    _ = _.split('/')
    return {
        userScreenName: _.slice(-3, -2)[0],
        statusId: _.slice(-1)[0]
    }
}