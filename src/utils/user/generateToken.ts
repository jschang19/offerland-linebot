import { SignJWT } from "jose";

export function generateBindingToken(lineId: string) {
	const token = new SignJWT({})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer(process.env.WEBSITE_URL)
		.setAudience(process.env.WEBSITE_URL)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET));

	return token;
}
