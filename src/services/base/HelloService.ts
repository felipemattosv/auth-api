class HelloService {
  async execute(name: string = "World"): Promise<string> {
    return `Hello, ${name}!`;
  }
}

export { HelloService };
