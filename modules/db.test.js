const db = require("./db")
// @ponicode
describe("db.connectToServer", () => {
    test("0", () => {
        let callFunction = () => {
            db.connectToServer("callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            db.connectToServer(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
