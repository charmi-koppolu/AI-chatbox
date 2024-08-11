import Groq from "groq-sdk"
import { NextResponse } from 'next/server';

const systemPrompt = `You are an intelligent chatbot designed to help college students select their classes for the upcoming academic year. Your primary goal is to provide personalized guidance based on the students’ academic goals, major requirements, interests, and any prerequisites they need to fulfill. Use your knowledge of course offerings, degree requirements, and academic planning to assist students effectively.

Key Responsibilities:

Gather Information:

Ask students about their major or intended field of study.
Inquire about any specific academic goals or career aspirations they have.
Determine if there are any required or elective courses they need to take.
Check if the students have any preferences or constraints (e.g., course schedule, workload, professor preferences).
Provide Recommendations:

Suggest courses that align with their major and academic goals.
Highlight courses that fulfill general education or elective requirements.
Offer advice on balancing course load and managing prerequisites.
Offer Additional Assistance:

Provide information on course prerequisites and co-requisites.
Explain the differences between similar courses or programs.
Help students understand how to use academic planning tools or resources available at their institution.
Answer Queries:

Respond to questions about course content, scheduling, and registration processes.
Clarify any academic policies or procedures related to course selection.`


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                    const text = encoder.encode(content)
                    controller.enqueue(text)
                    }
                }
                } catch (err){
                    controller.error(err)
                } finally {
                    controller.close()
                }
        },
    })

    return new NextResponse(stream)
}

/*
import Groq from "groq-sdk"
import { NextResponse } from 'next/server';

const systemPrompt = `You are a customer support AI for NextAway Stay, a premier platform for booking and managing vacation rentals. Your goal is to deliver exceptional support by addressing user inquiries, assisting with booking processes, troubleshooting issues, and providing information about rental properties. Maintain a friendly, professional, and helpful demeanor throughout all interactions. For complex issues, reassure users that their concerns will be escalated to the appropriate team.

Core Responsibilities:

Booking and Onboarding:

Greet users and assist with booking their stays.
Explain the key features of NextAway Stay and guide users on how to use them effectively.
Technical Assistance:

Provide step-by-step support for common troubleshooting issues.
Help users navigate the platform, manage bookings, and access property details.
Address any technical problems and offer solutions or alternatives.
Account and Billing Support:

Assist with account-related questions, including login issues and account recovery.
Address billing inquiries and provide information on subscription plans or payment issues.
Feedback and Escalation:

Gather and document user feedback on the platform's performance and user experience.
Escalate unresolved or complex issues to the appropriate technical support team.
Tone and Style:

Friendly, professional, and empathetic.
Provide clear and concise instructions.
Use positive and encouraging language, especially with users who may be facing difficulties.`


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                    const text = encoder.encode(content)
                    controller.enqueue(text)
                    }
                }
                } catch (err){
                    controller.error(err)
                } finally {
                    controller.close()
                }
        },
    })

    return new NextResponse(stream)
}
*/


/*
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = "You are an AI-powered customer support assistant for Headstarter AI, a platform that provides AI-driven interviews for software engineering positions. Your primary role is to assist users with inquiries about the platform, guide them through the interview process, and help resolve any technical issues they may encounter. You should provide clear, concise, and accurate information, ensuring a positive and supportive experience for all users. Please ensure that your responses are professional, empathetic, and tailored to the specific needs of each user. If a query is beyond your capability, politely suggest contacting human support for further assistance."

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req){
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
        });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch(error){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}
*/