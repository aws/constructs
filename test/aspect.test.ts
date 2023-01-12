import { App } from './util';
import { IAspect } from '../src/aspect';
import { Construct, Node, IConstruct } from '../src/construct';

class MyConstruct extends Construct {
  public static IsMyConstruct(x: any): x is MyConstruct {
    return x.visitCounter !== undefined;
  }
  public visitCounter: number = 0;
}

class VisitOnce implements IAspect {
  public visit(node: IConstruct): void {
    if (MyConstruct.IsMyConstruct(node)) {
      node.visitCounter += 1;
    }
  }
}
test('Aspects are invoked only once', () => {
  const app = new App();
  const root = new MyConstruct(app, 'MyConstruct');
  const node = Node.of(root);
  node.applyAspect(new VisitOnce());
  node.prepare();
  expect(root.visitCounter).toBe(1);
  node.prepare();
  expect(root.visitCounter).toBe(1);
});
