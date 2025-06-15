import { NextResponse } from 'next/server';

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export const ApiResponseHandler = {
  success<T>(data?: T, message: string = 'Success'): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return NextResponse.json(response, { status: 200 });
  },

  error(error: Error | string, message: string = 'An error occurred'): NextResponse {
    const response: ApiResponse = {
      success: false,
      message,
      error: error instanceof Error ? error.message : error,
    };
    return NextResponse.json(response, { status: 500 });
  },

  badRequest(message: string = 'Bad request'): NextResponse {
    const response: ApiResponse = {
      success: false,
      message,
    };
    return NextResponse.json(response, { status: 400 });
  },

  unauthorized(message: string = 'Unauthorized'): NextResponse {
    const response: ApiResponse = {
      success: false,
      message,
    };
    return NextResponse.json(response, { status: 401 });
  },

  notFound(message: string = 'Not found'): NextResponse {
    const response: ApiResponse = {
      success: false,
      message,
    };
    return NextResponse.json(response, { status: 404 });
  },
};

