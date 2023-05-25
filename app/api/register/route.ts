import {  NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try{
    const body = await request.json()
    const {name, email, password} = body

    console.log(body)

    if(!email || !name || !password) {
      return new NextResponse("Missing Info", {status: 400})
    }

    // If data valid, let hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma?.user.create({
      data: {
        email, name, hashedPassword
      }
    })

    return NextResponse.json(user)
  }catch(err: any) {
    console.log(err, "REGISTRATION FAILED")
    return new NextResponse("Internal Server Error", {status: 500})
  }
}