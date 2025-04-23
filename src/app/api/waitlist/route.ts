import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, referralSource } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !referralSource) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Add new entry to Supabase
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          referral_source: referralSource,
          created_at: new Date().toISOString(),
        }
      ]);

    if (insertError) {
      console.error('Error inserting into Supabase:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details
      });
      return NextResponse.json(
        { error: `Database error: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 