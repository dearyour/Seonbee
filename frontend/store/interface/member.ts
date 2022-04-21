import { useState } from "react"

export class Member {
  id: number
  created_date: Date
  isDeleted: boolean
  email: string
  nickname: string
  isAdmin: boolean


  constructor(data: any) {
    this.id = data.id || 0
    this.created_date = data.created_date || Date.now()
    this.isDeleted = data.is_deleted || false
    this.email = data.email || ''
    this.nickname = data.nickname || ''
    this.isAdmin = data.is_admin || false


  }
}

function MemberList(data: Array<any>): Member[] {
  return data.map((people) => {
    return new Member(people)
  })
}

export default MemberList;