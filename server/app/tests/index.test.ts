import express from "express";
import request from "supertest";
import app, { server } from "../app";
import User, { UserInterface } from "../models/User";
import { users, populateUsers } from "./seed/seed";

beforeEach(populateUsers);
describe("POST/user", () => {
    it("should create a new user", done => {
        request(app)
            .post("/user?email=jane@gmail.com&firstName=Jane&lastName=Doe")
            .expect(200)
            .expect((res: any) => {
                expect(res.body.email).toBe("jane@gmail.com");
                expect(res.body.firstName).toBe("Jane");
                expect(res.body.lastName).toBe("Doe");
            })
            .end(async (err: Error) => {
                if (err) {
                    done(err);
                }
                const user = await User.findOne({ email: "jane@gmail.com" });
                if (!user) throw new Error("No user found");
                expect(user.email).toBe("jane@gmail.com");
                expect(user.firstName).toBe("Jane");
                expect(user.lastName).toBe("Doe");
                done();
            });
    });
});

server.close();
