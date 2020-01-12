import { Users, Records } from "../models";

class CreateBadgeJob {
    records = []
    userId = undefined
    constructor(userId) {
        this.userId = userId
    }

    handle() {
        this.records = Records.findAll({ where: { user_id: this.userId }})
        this.createBadgeByUser()
    }

    createCycleBadgeByUser() {
        
    }
    
    createRunningBadgeByUser() {
    
    }
    
    createContinousRecordBadgeByUser() {
    
    }
    
    createSuccessChallengeBadgeByUser() {
    
    }
}
