class Singleton {
  private static instance: Singleton;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public doSomething(): void {
    console.log("Singleton instance performing an action.");
  }
}

// Usage:
const instance1 = Singleton.getInstance();
instance1.doSomething();

const instance2 = Singleton.getInstance();
instance2.doSomething();

console.log(instance1 === instance2); // true
