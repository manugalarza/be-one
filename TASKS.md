# NestJS Workshop – Validation Questions

These questions require you to reason about the code, not just recall definitions. Open the files as you work through them.

---

**Q1 — Dead route diagnosis**

Look at [tasks.controller.ts:27](src/tasks/tasks.controller.ts#L27). Right now, `findAll()` has no route decorator. If you start the server and call `GET /tasks`, what response do you get — a 404, a 500, or something else? Explain *why* NestJS behaves that way, and describe exactly what you need to add to fix it.

---

**Q2 — When `transform: true` is not enough**

[main.ts:15](src/main.ts#L15) sets `transform: true` on the global `ValidationPipe`, which auto-converts types. Yet [products.controller.ts:32](src/products/products.controller.ts#L32) still uses `ParseIntPipe` explicitly on `@Param('id')`. If `transform: true` already handles type conversion, why is `ParseIntPipe` still there? Are they doing the same job, or is there a difference in *when* or *how* they convert and reject?

---

**Q3 — Silent strip vs hard rejection**

[main.ts:13-14](src/main.ts#L13-L14) enables both `whitelist: true` and `forbidNonWhitelisted: true`. Imagine you remove `forbidNonWhitelisted: true` and keep only `whitelist: true`. Now send this request:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "m@m.com", "age": 20, "password": "secret"}'
```

What is the exact response status and body? What happens to `"password"` in the service? Why could this behavior be a security problem in a real app?

---

**Q4 — Mutation side-effect**

Read [products.service.ts:44-48](src/products/products.service.ts#L44-L48). The `update` method calls `Object.assign(product, dto)`, which mutates the object in the array directly. Now read [products.service.ts:21-23](src/products/products.service.ts#L21-L23) — `findAll()` returns `this.products` directly.

If a caller modifies the object returned by `findAll()`, does that change the data stored in the service? Trace through the code and explain why. What would you change to prevent this?

---

**Q5 — The optional field trap**

In [update-product.dto.ts:12-14](src/products/dto/update-product.dto.ts#L12-L14), `price` has both `@IsNumber()`, `@IsPositive()`, and `@IsOptional()`. Send this PATCH request:

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": -50}'
```

Does validation pass or fail? Now send this:

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

Does validation pass or fail? Explain the exact rule `@IsOptional()` enforces — what does "optional" actually mean to `class-validator`?

---

**Q6 — ID reuse after deletion**

Look at how `nextId` works in [tasks.service.ts:18-19](src/tasks/tasks.service.ts#L18-L19) alongside `remove` at [tasks.service.ts:50-53](src/tasks/tasks.service.ts#L50-L53). If you delete task `#1`, then create a new task, what ID does the new task get? Could `findOne(1)` ever return the wrong task? Now consider: what if the implementation used `this.tasks.length + 1` as the ID instead of `nextId` — walk through a create/delete/create sequence and show why that would break.

---

**Q7 — Module forgotten**

You finish building all five files in the Users module but forget to add `UsersModule` to the `imports` array in [app.module.ts](src/app.module.ts). What happens when you:

a) Start the server — does it crash or start normally?  
b) Send `POST /users` — what is the response status and why?

Now explain: is this a *compile-time* error, a *startup* error, or a *runtime* error in NestJS terms?

---

**Q8 — Missing 201**

The stub in [tasks.controller.ts:37-39](src/tasks/tasks.controller.ts#L37-L39) will eventually have a `@Post()` decorator, but there is no `@HttpCode(HttpStatus.CREATED)`. What HTTP status code does a `@Post()` handler return by default in NestJS? Is the absence of `@HttpCode(201)` functionally wrong — could a client break because of it? When does it actually matter?

---

**Q9 — Service throws, not returns null**

In [products.service.ts:25-30](src/products/products.service.ts#L25-L30), `findOne` throws `NotFoundException` instead of returning `null`. Rewrite the method signature and the controller's `findOne` method as they would look if the service returned `null` instead. Then explain: which version is better for a growing codebase where `findOne` is called from multiple places (e.g., inside `update` and `remove` as well), and why?

---
