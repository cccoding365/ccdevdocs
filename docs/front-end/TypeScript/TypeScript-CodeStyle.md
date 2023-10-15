# 1. 前言
## 1.1. 简介
这份风格指南基于谷歌的内部版本，并在此基础上做了一些修改，使其具有更广泛的适用性。

指南中的内容包括代码规范与最佳实践两部分。读者可根据所在团队的需求加以参考和选用。

指南中对 *必须*、*禁止*、*应当*、*不应*、*可以* 等词语的用法遵循 RFC 2119 中的定义。文中的所有示例均非适合实际项目的正式用法，只用于对指南中的内容加以说明。
## 1.2. 原文链接
[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)


# 2. 语法规范
## 2.1. 标识符
### 2.1.1. 命名规范
在 TypeScript 中，标识符只能使用 ASCII 码表中的字母、数字、下划线和`$`。因此，合法的标识符可以使用正则表达式 `/^[a-zA-Z_$][0-9a-zA-Z_$]*$/` 进行匹配。根据标识符的用途不同，使用的命名法也不同，如下表所示：

| 命名法 | 分类 |
| - | - |
| 帕斯卡命名法（`UpperCamelCase`） | 类、接口、类型、枚举、装饰器、类型参数 |
| 驼峰式命名法（`lowerCamelCase`） | 变量、参数、函数、方法、属性、模块别名 |
| 全大写下划线命名法（`CONSTANT_CASE`） | 全局常量、枚举值 |
| 私有成员命名法（`#ident`） | 不允许使用 |
#### 2.1.1.1. 缩写
缩写应被视为一个词。例如，应使用 `loadHttpUrl`，而非 `loadHTTPURL`。平台有特殊要求的标识符例外，如 `XMLHttpRequest`。

#### 2.1.1.2. 美元符号 `$`
一般情况下，标识符不应使用 `$`，除非为了与第三方框架的命名规范保持一致。关于 `$` 的使用，可参见 **命名风格** 一节对 `Observable` 类型的说明。

#### 2.1.1.3. 类型参数
形如 `Array<T>` 的类型参数既可以使用单个大写字母（如 `T`），也可以使用帕斯卡命名法（如 `UpperCamelCase`）。

#### 2.1.1.4. 测试用例
无论是在 `Closure` 库的 `testSuites` 还是 `xUnit` 风格的测试框架中，都可以使用 `_` 作为标识符的分隔符，例如 `testX_whenY_doesZ()`。

#### 2.1.1.5. `_` 前缀与后缀
标识符禁止使用下划线 `_` 作为前缀或后缀。这也意味着，禁止使用单个下划线 `_` 作为标识符（例如：用来表示未被使用的参数）。

如果需要从数组或元组中取出某个或某几个特定的元素的话，可以在解构语句中插入额外的逗号，忽略掉不需要的元素：
```ts
const [a, , b] = [1, 5, 10];  // a <- 1, b <- 10
```
#### 2.1.1.6. 导入模块
导入模块的命名空间时使用驼峰命名法（`lowerCamelCase`），文件名则使用蛇形命名法（`snake_case`）。例如：
```ts
import * as fooBar from './foo_bar';
```
一些库可能会在导入命名空间时使用某种特定的前缀，这与这里规定的命名规范有所冲突。然而，由于其中的一些库已经被广泛使用，因此遵循它们的特殊规则反而能够获得更好的可读性。这些特例包括：

- jQuery，使用 `$` 前缀。
- three.js，使用 `THREE` 前缀。
#### 2.1.1.7. 常量
常量命名（`CONSTANT_CASE`）表示某个值不可被修改。它还可以用于虽然技术上可以实现，但是用户不应当试图修改的值，比如并未进行深度冻结（deep frozen）的值。
```ts
const UNIT_SUFFIXES = {
    'milliseconds': 'ms',
    'seconds': 's',
};
// UNIT_SUFFIXES 使用了常量命名，
// 这意味着用户不应试图修改它，
// 即使它实际上是一个可变的值。
```
这里所说的常量，也包括类中的静态只读属性：
```ts
class Foo {
    private static readonly MY_SPECIAL_NUMBER = 5;

    bar() {
        return 2 * Foo.MY_SPECIAL_NUMBER;
    }
}
```
#### 2.1.1.8. 其他
如果某个值在程序的整个运行生命周期中会被多次实例化或被用户以任何方式进行修改，则它必须使用驼峰式命名法。

如果某个值是作为某个接口的实现的箭头函数，则它也可以使用驼峰式命名法。

#### 2.1.2. 别名
在为一个已有的标识符创建具有局部作用域的别名时，别名的命名方式应当与现有的标识符和现有的命名规范保持一致。声明别名时，应使用 `const` （如果它是一个变量）或 `readonly` （如果它是类里的一个字段）。
```ts
const {Foo} = SomeType;
const CAPACITY = 5;

class Teapot {
    readonly BrewStateEnum = BrewStateEnum;
    readonly CAPACITY = CAPACITY;
}
```
### 2.1.3. 命名风格
TypeScript 中的类型表达了丰富的信息，因此在起名时不应与类型中所携带的信息重复。

这里有几个具体的例子：

- 不要为私有属性或方法名添加下划线 `_` 前缀或后缀。
- 不要为可选参数添加 `opt_` 前缀。
- 除非在项目中已成惯例，否则不要显式地标记接口类型（例如不要使用 `IMyInterface` 或者 `MyFooInterface` ）。在为类添加接口时，接口名称中应包含创建这一接口的原因。（例如，在为类 `TodoItem` 创建一个将其转为 JSON 格式以用于存储或者序列化的接口时，可以将这一接口命名为 `TodoItemStorage` 。）
- 对于 `Observable` 类型的值，通常的惯例是使用 `$` 前缀将其与一般类型的值进行区分，使之不致混淆。各个团队可以在与项目内部的现有做法保持一致的前提下，自行决定是否采用这一做法。
### 2.1.4. 描述性命名
命名应当具有描述性且易于读者理解。不要使用对项目以外的用户而言含糊不清或并不熟悉的缩写，不要通过删减单词中的字母来强行创造缩写。

这一规则的例外是，对不超过十行的作用域中的变量，以及内部 API 的参数，可以使用短变量名（例如 `i` 、 `j` 等只有单个字母的变量名）。

## 2.2. 文件编码
使用 UTF-8 文件编码。

对于非 ASCII 字符，应使用实际的 Unicode 字符（例如 `∞` ）。对于非输出字符，使用对应的十六进制编码或 Unicode 转义编码（如 `\u221e` ），并添加注释进行说明。
```ts
// 应当这样做！即使没有注释也十分易懂。
const units = 'μs';

// 应当这样做！对非输出字符进行转义。
const output = '\ufeff' + content;  // 字节顺序标记（Byte Order Mark，BOM）
```
```ts
// 不要这样做！即使加上注释也不太好读，而且容易出错。
const units = '\u03bcs'; // Greek letter mu, 's'

// 不要省略注释！读者在缺少注释的情况下很难理解这个字符的含义。
const output = '\ufeff' + content;
```
## 2.3. 注释与文档
### 2.3.1. 用 JSDoc 还是 注释？
TypesScript 中有两种类型的注释：JSDoc `/** ... */` 和普通注释 `// ... 或者 /* ... */` 。

对于文档，也就是用户应当阅读的注释，使用 `/** JSDoc */` 。
对于实现说明，也就是只和代码本身的实现细节有关的注释，使用 `// 行注释` 。
JSDoc 注释能够为工具（例如编辑器或文档生成器）所识别，而普通注释只能供人阅读。

### 2.3.2. JSDoc 规范
JSDoc 的规范大部分遵循 JavaScript 风格指南中的规定。具体地说，遵循 JavaScript 风格指南中 注释 一节的规则。本节的剩余部分只对与这些规则不一致的部分进行说明。

### 2.3.3. 对所有导出的顶层模块进行注释
使用 `/** JSDoc */` 注释为代码的用户提供信息。这些注释应当言之有物，切忌仅仅将属性名或参数名重抄一遍。如果代码的审核人认为某个属性或方法的作用不能从它的名字上一目了然地看出来的话，这些属性和方法同样应当使用 `/** JSDoc */` 注释添加说明文档，无论它们是否被导出，是公开还是私有的。

### 2.3.4. 省略对于 TypeScript 而言多余的注释
例如，不要在 `@param` 或 `@return` 注释中声明类型，不要在使用了 `implements` 、 `enum` 、 `private` 等关键字的地方添加 `@implements` 、 `@enum` 、 `@private` 等注释。

### 2.3.5. 不要使用 `@override`
不要在 TypeScript 代码中使用 `@override` 注释。 `@override` 并不会被编译器视为强制性约束，这会导致注释与实现上的不一致性。如果纯粹为了文档添加这一注释，反而令人困惑。

### 2.3.6. 注释必须言之有物
虽然大多数情况下文档对代码十分有益，但对于那些并不用于导出的符号，有时其函数或参数的名称与类型便足以描述自身了。

注释切忌照抄参数类型和参数名，如下面的反面示例：
```ts
// 不要这样做！这个注释没有任何有意义的内容。
/** @param fooBarService Foo 应用的 Bar 服务 */
```
因此，只有当需要添加额外信息时才使用 `@param` 和 `@return` 注释，其它情况下直接省略即可。
```ts
/**
 * 发送 POST 请求，开始煮咖啡
 * @param amountLitres 煮咖啡的量，注意和煮锅的尺寸对应！
 */
brew(amountLitres: number, logger: Logger) {
    // ...
}
```
### 2.3.7. 参数属性注释
通过为构造函数的参数添加访问限定符，参数属性同时创建了构造函数参数和类成员。例如，如下的构造函数
```ts
class Foo {
    constructor(private readonly bar: Bar) { }
}
```
为 `Foo` 类创建了 `Bar` 类型的成员 `bar` 。

如果要为这些成员添加文档，应使用 JSDoc 的 `@param` 注释，这样编辑器会在调用构造函数和访问属性时显示对应的文档描述信息。
```ts
/** 这个类演示了如何为参数属性添加文档 */
class ParamProps {
    /**
     * @param percolator 煮咖啡所用的咖啡壶。
     * @param beans 煮咖啡所用的咖啡豆。
     */
    constructor(
        private readonly percolator: Percolator,
        private readonly beans: CoffeeBean[]) {}
}
```
```ts
/** 这个类演示了如何为普通成员添加文档 */
class OrdinaryClass {
    /** 下次调用 brew() 时所用的咖啡豆。 */
    nextBean: CoffeeBean;

    constructor(initialBean: CoffeeBean) {
        this.nextBean = initialBean;
    }
}
```
### 2.3.8. 函数调用注释
如果有需要，可以在函数的调用点使用行内的 `/* 块注释 */` 为参数添加文档，或者使用字面量对象为参数添加名称并在函数声明中进行解构。注释的格式和位置没有明确的规定。
```ts
// 使用行内块注释为难以理解的参数添加说明：
new Percolator().brew(/* amountLitres= */ 5);

// 或者使用字面量对象为参数命名，并在函数 brew 的声明中将参数解构：
new Percolator().brew({amountLitres: 5});
/** 一个古老的咖啡壶 {@link CoffeeBrewer} */
export class Percolator implements CoffeeBrewer {
    /**
     * 煮咖啡。
     * @param amountLitres 煮咖啡的量，注意必须和煮锅的尺寸对应！
     */
    brew(amountLitres: number) {
        // 这个实现煮出来的咖啡味道差极了，不管了。
        // TODO(b/12345): 优化煮咖啡的过程。
    }
}
```
### 2.3.9. 将文档置于装饰器之前
文档、方法或者属性如果同时具有装饰器（例如 `@Component`）和 JSDoc 注释，应当将 JSDoc 置于装饰器之前。

禁止将 JSDoc 置于装饰器和被装饰的对象之间。
```ts
// 不要这样做！JSDoc 被放在装饰器 @Component 和类 FooComponent 中间了！
@Component({
    selector: 'foo',
    template: 'bar',
})
/** 打印 "bar" 的组件。 */
export class FooComponent {}
```
应当将 JSDoc 置于装饰器之前。
```ts
/** 打印 "bar" 的组件。 */
@Component({
    selector: 'foo',
    template: 'bar',
})
export class FooComponent {}
```


# 3. 语言特性
## 3.1. 可见性
限制属性、方法以及类型的可见性有助于代码解耦合。因此：

应当尽可能限制符号的可见性。
可以将私有方法在同一文件中改写为独立于所有类以外的内部函数，并将私有属性移至单独的内部类中。
在 TypeScript 中，符号默认的可见性即为 `public` ，因此，除了在构造函数中声明公开（ `public` ）且非只读（ `readonly` ）的参数属性之外，不要使用 `public` 修饰符。
```ts
class Foo {
    public bar = new Bar();  // 不要这样做！不需要 public 修饰符！

    constructor(public readonly baz: Baz) {}  // 不要这样做！readonly 修饰符已经表明了 baz 是默认 public 的属性，因此不需要 public 修饰符！
}
class Foo {
    bar = new Bar();  // 应当这样做！将不需要的 public 修饰符省略！

    constructor(public baz: Baz) {}  // 可以这样做！公开且非只读的参数属性允许使用 public 修饰符！
}
```
关于可见性，还可参见 **导出可见性** 一节。

## 3.2. 构造函数
调用构造函数时必须使用括号，即使不传递任何参数。
```ts
// 不要这样做！
const x = new Foo;

// 应当这样做！
const x = new Foo();
```
没有必要提供一个空的或者仅仅调用父类构造函数的构造函数。在 ES2015 标准中，如果没有为类显式地提供构造函数，编译器会提供一个默认的构造函数。但是，含有参数属性、访问修饰符或参数装饰器的构造函数即使函数体为空也不能省略。

```ts
// 不要这样做！没有必要声明一个空的构造函数！
class UnnecessaryConstructor {
    constructor() {}
}
// 不要这样做！没有必要声明一个仅仅调用基类构造函数的构造函数！
class UnnecessaryConstructorOverride extends Base {
    constructor(value: number) {
        super(value);
    }
}
// 应当这样做！默认构造函数由编译器提供即可！
class DefaultConstructor {
}

// 应当这样做！含有参数属性的构造函数不能省略！
class ParameterProperties {
    constructor(private myService) {}
}

// 应当这样做！含有参数装饰器的构造函数不能省略！
class ParameterDecorators {
    constructor(@SideEffectDecorator myService) {}
}

// 应当这样做！私有的构造函数不能省略！
class NoInstantiation {
    private constructor() {}
}
```
## 3.3. 类成员
### 3.3.1. `#private` 语法
不要使用 `#private` 私有字段（又称私有标识符）语法声明私有成员。
```ts
// 不要这样做！
class Clazz {
    #ident = 1;
}
```
而应当使用 TypeScript 的访问修饰符。

```ts
// 应当这样做！
class Clazz {
    private ident = 1;
}
```
为什么？因为私有字段语法会导致 TypeScipt 在编译为 JavaScript 时出现体积和性能问题。同时，ES2015 之前的标准都不支持私有字段语法，因此它限制了 TypeScript 最低只能被编译至 ES2015。另外，在进行静态类型和可见性检查时，私有字段语法相比访问修饰符并无明显优势。

### 3.3.2. 使用 readonly
对于不会在构造函数以外进行赋值的属性，应使用 `readonly` 修饰符标记。这些属性并不需要具有深层不可变性。

### 3.3.3. 参数属性
不要在构造函数中显式地对类成员进行初始化。应当使用 TypeScript 的 参数属性 语法。
```ts
// 不要这样做！重复的代码太多了！
class Foo {
    private readonly barService: BarService;

    constructor(barService: BarService) {
        this.barService = barService;
    }
}
// 应当这样做！简洁明了！
class Foo {
    constructor(private readonly barService: BarService) {}
}
```
如果需要为参数属性添加文档，应使用 JSDoc 的 `@param` 标签，参见 **参数属性注释** 一节。

### 3.3.4. 字段初始化
如果某个成员并非参数属性，应当在声明时就对其进行初始化，这样有时可以完全省略掉构造函数。
```ts
// 不要这样做！没有必要单独把初始化语句放在构造函数里！
class Foo {
    private readonly userList: string[];
    constructor() {
        this.userList = [];
    }
}
// 应当这样做！省略了构造函数！
class Foo {
    private readonly userList: string[] = [];
}
```
### 3.3.5. 用于类的词法范围之外的属性
如果一个属性被用于它们所在类的词法范围之外，例如用于模板（template）的 AngularJS 控制器（controller）属性，则禁止将其设为 `private` ，因为显然这些属性是用于外部的。

对于这类属性，应当将其设为 `public` ，如果有需要的话也可以使用 `protected` 。例如，Angular 和 Polymer 的模板属性应使用 `public` ，而 AngularJS 应使用 `protected` 。

此外，禁止在 TypeScript 代码中使用 `obj['foo']` 语法绕过可见性限制进行访问。

为什么？

如果一个属性被设为 `private`，就相当于向自动化工具和读者声明对这个属性的访问局限于类的内部。例如，用于查找未被使用的代码的工具可能会将一个私有属性标记为未使用，即使在其它文件中有代码设法绕过了可见性限制对其进行访问。

虽然 `obj['foo']` 可以绕过 TypeScript 编译器对可见性的检查，但是这种访问方法可能会由于调整了构建规则而失效。此外，它也违反了后文中所提到的 **优化属性访问的兼容性** 规则。

### 3.3.6. 取值器与设值器（存取器）
可以在类中使用存取器，其中取值器方法必须是纯函数（即结果必须是一致稳定的，且不能有副作用）。存取器还可以用于隐藏内部复杂的实现细节。
```ts
class Foo {
    constructor(private readonly someService: SomeService) {}

    get someMember(): string {
        return this.someService.someVariable;
    }

    set someMember(newValue: string) {
        this.someService.someVariable = newValue;
    }
}
```
如果存取器被用于隐藏类内部的某个属性，则被隐藏的属性应当以诸如 `internal` 或 `wrapped` 此类的完整单词作为前缀或后缀。在使用这些私有属性时，应当尽可能地通过存取器进行访问。取值器和设值器二者至少要有一个是非平凡的，也就是说，存取器不能只用于传递属性值，更不能依赖这种存取器对属性进行隐藏。这种情况下，应当直接将属性设为 `public`。对于只有取值器没有设值器的属性，则应当考虑直接将其设为 `readonly`。
```ts
class Foo {
    private wrappedBar = '';
    get bar() {
        return this.wrappedBar || 'bar';
    }

    set bar(wrapped: string) {
        this.wrappedBar = wrapped.trim();
    }
}
class Bar {
    private barInternal = '';
    // 不要这样做！取值器和设值器都没有任何逻辑，这种情况下应当直接将属性 bar 设为 public。
    get bar() {
        return this.barInternal;
    }

    set bar(value: string) {
        this.barInternal = value;
    }
}
```
## 3.4. 原始类型与封装类
在 TypeScript 中，不要实例化原始类型的封装类，例如 `String` 、 `Boolean` 、 `Number` 等。封装类有许多不合直觉的行为，例如 `new Boolean(false)` 在布尔表达式中会被求值为 `true`。
```ts
// 不要这样做！
const s = new String('hello');
const b = new Boolean(false);
const n = new Number(5);
// 应当这样做！
const s = 'hello';
const b = false;
const n = 5;
```
## 3.5. 数组构造函数
在 TypeScript 中，禁止使用 `Array()` 构造函数（无论是否使用 `new` 关键字）。它有许多不合直觉又彼此矛盾的行为，例如：
```ts
// 不要这样做！同样的构造函数，其构造方式却却完全不同！
const a = new Array(2); // 参数 2 被视作数组的长度，因此返回的结果是 [undefined, undefined]
const b = new Array(2, 3); // 参数 2, 3 被视为数组中的元素，返回的结果此时变成了 [2, 3]
```
应当使用方括号对数组进行初始化，或者使用 `from` 构造一个具有确定长度的数组：
```ts
const a = [2];
const b = [2, 3];

// 等价于 Array(2)：
const c = [];
c.length = 2;

// 生成 [0, 0, 0, 0, 0]
Array.from<number>({length: 5}).fill(0);
```
## 3.6. 强制类型转换
在 TypeScript 中，可以使用 `String()` 和 `Boolean()` 函数（注意不能和 `new` 一起使用！）、模板字符串和 `!!` 运算符进行强制类型转换。
```ts
const bool = Boolean(false);
const str = String(aNumber);
const bool2 = !!str;
const str2 = `result: ${bool2}`;
```
不建议通过字符串连接操作将类型强制转换为 `string` ，这会导致加法运算符两侧的运算对象具有不同的类型。

在将其它类型转换为数字时，必须使用 `Number()` 函数，并且，在类型转换有可能失败的场合，必须显式地检查其返回值是否为 `NaN` 。

Tip

>`Number('')` 、 `Number(' ')` 和 `Number('\t')` 返回 `0` 而不是 `NaN` 。 `Number('Infinity')` 和 `Number('-Infinity')` 分别返回 `Infinity` 和 `-Infinity` 。这些情况可能需要特殊处理。
```ts
const aNumber = Number('123');
if (isNaN(aNumber)) throw new Error(...);  // 如果输入字符串有可能无法被解析为数字，就需要处理返回 NaN 的情况。
assertFinite(aNumber, ...);                // 如果输入字符串已经保证合法，可以在这里添加断言。
```
禁止使用一元加法运算符 `+` 将字符串强制转换为数字。用这种方法进行解析有失败的可能，还有可能出现奇怪的边界情况。而且，这样的写法往往成为代码中的坏味道， `+` 在代码审核中非常容易被忽略掉。
```ts
// 不要这样做！
const x = +y;
```
同样地，代码中也禁止使用 `parseInt` 或 `parseFloat` 进行转换，除非用于解析表示非十进制数字的字符串。因为这两个函数都会忽略字符串中的后缀，这有可能在无意间掩盖了一部分原本会发生错误的情形（例如将 12 dwarves 解析成 12）。
```ts
const n = parseInt(someString, 10);  // 无论传不传基数，
const f = parseFloat(someString);    // 都很容易造成错误。
```
对于需要解析非十进制数字的情况，在调用 `parseInt` 进行解析之前必须检查输入是否合法。
```ts
if (!/^[a-fA-F0-9]+$/.test(someString)) throw new Error(...);
// 需要解析 16 进制数。
// tslint:disable-next-line:ban
const n = parseInt(someString, 16);  // 只允许在非十进制的情况下使用 parseInt。
```
应当使用 `Number()` 和 `Math.floor` 或者 `Math.trunc` （如果支持的话）解析整数。

```ts
let f = Number(someString);
if (isNaN(f)) handleError();
f = Math.floor(f);
```
不要在 `if` 、 `for` 或者 `while` 的条件语句中显式地将类型转换为 boolean ，因为这里原本就会执行隐式的类型转换。
```ts
// 不要这样做！
const foo: MyInterface|null = ...;
if (!!foo) {...}
while (!!foo) {...}
// 应当这样做！
const foo: MyInterface|null = ...;
if (foo) {...}
while (foo) {...}
```
最后，在代码中使用显式和隐式的比较均可。
```ts
// 显式地和 0 进行比较，没问题！
if (arr.length > 0) {...}

// 依赖隐式类型转换，也没问题！
if (arr.length) {...}
```
## 3.7. 变量
必须使用 `const` 或 `let` 声明变量。尽可能地使用 `const` ，除非这个变量需要被重新赋值。禁止使用 `var` 。
```ts
const foo = otherValue;  // 如果 foo 不可变，就使用 const。
let bar = someValue;     // 如果 bar 在之后会被重新赋值，就使用 let。
```
与大多数其它编程语言类似，使用 `const` 和 `let` 声明的变量都具有块级作用域。与之相反的是，使用 `var` 声明的变量在 `JavaScript` 中具有函数作用域，这会造成许多难以理解的 bug，因此禁止在 TypeScript 中使用 `var` 。
```ts
// 不要这么做！
var foo = someValue;
```
最后，变量必须在使用前进行声明。

## 3.8. 异常
在实例化异常对象时，必须使用 `new Error()` 语法而非调用 `Error()` 函数。虽然这两种方法都能够创建一个异常实例，但是使用 `new` 能够与代码中其它的对象实例化在形式上保持更好的一致性。
```ts
// 应当这样做！
throw new Error('Foo is not a valid bar.');

// 不要这样做！
throw Error('Foo is not a valid bar.');
```
## 3.9. 对象迭代
对对象使用 `for (... in ...)` 语法进行迭代很容易出错，因为它同时包括了对象从原型链中继承得来的属性。因此，禁止使用裸的 `for (... in ...)` 语句。
```ts
// 不要这样做！
for (const x in someObj) {
    // x 可能包括 someObj 从原型中继承得到的属性。
}
```
在对对象进行迭代时，必须使用 `if` 语句对对象的属性进行过滤，或者使用 `for (... of Object.keys(...))` 。
```ts
// 应当这样做！
for (const x in someObj) {
    if (!someObj.hasOwnProperty(x)) continue;
    // 此时 x 必然是定义在 someObj 上的属性。
}
// 应当这样做！
for (const x of Object.keys(someObj)) { // 注意：这里使用的是 for _of_ 语法！
    // 此时 x 必然是定义在 someObj 上的属性。
}
// 应当这样做！
for (const [key, value] of Object.entries(someObj)) { // 注意：这里使用的是 for _of_ 语法！
    // 此时 key 必然是定义在 someObj 上的属性。
}
```
## 3.10. 容器迭代
不要在数组上使用 `for (... in ...)` 进行迭代。这是一个违反直觉的操作，因为它是对数组的下标而非元素进行迭代（还会将其强制转换为 `string` 类型）！
```ts
// 不要这样做！
for (const x in someArray) {
    // 这里的 x 是数组的下标！(还是 string 类型的！)
}
```
如果要在数组上进行迭代，应当使用 `for (... of someArr)` 语句或者传统的 `for` 循环语句。
```ts
// 应当这样做！
for (const x of someArr) {
    // 这里的x 是数组的元素。
}
// 应当这样做！
for (let i = 0; i < someArr.length; i++) {
    // 如果需要使用下标，就对下标进行迭代，否则就使用 for/of 循环。
    const x = someArr[i];
    // ...
}
// 应当这样做！
for (const [i, x] of someArr.entries()) {
    // 上面例子的另一种形式。
}
```
不要使用 `Array.prototype.forEach` 、 `Set.prototype.forEach` 和 `Map.prototype.forEach` 。这些方法会使代码难以调试，还会令编译器的某些检查（例如可见性检查）失效。
```ts
// 不要这样做！
someArr.forEach((item, index) => {
    someFn(item, index);
});
```
为什么？考虑下面这段代码：
```ts
let x: string|null = 'abc';
myArray.forEach(() => { x.charAt(0); });
```
从读者的角度看，这段代码并没有什么问题： `x` 没有被初始化为 `null` ，并且在被访问之前也没有发生过任何变化。但是对编译器而言，它并不知道传给 `.forEach()` 的闭包 `() => { x.charAt(0); }` 会被立即执行。因此，编译器有理由认为闭包有可能在之后的某处代码中被调用，而到那时 `x` 已经被设为 `null` 。于是，这里出现了一个编译错误。与之等价的 `for of` 形式的迭代就不会有任何问题。

在工程实践中，代码路径越复杂、越违背直觉，越容易在进行控制流分析时出现这类问题。

## 3.11. 展开运算符
在复制数组或对象时，展开运算符 `[...foo]`、`{...bar}` 是一个非常方便的语法。使用展开运算符时，对于同一个键，后出现的值会取代先出现的值。
```ts
const foo = {
    num: 1,
};

const foo2 = {
    ...foo,
    num: 5,
};

const foo3 = {
    num: 5,
    ...foo,
}

// 对于 foo2 而言，1 先出现，5 后出现。
foo2.num === 5;

// 对于 foo3 而言，5 先出现，1 后出现。
foo3.num === 1;
```
在使用展开运算符时，被展开的值必须与被创建的值相匹配。也就是说，在创建对象时只能展开对象，在创建数组时只能展开可迭代类型。

禁止展开原始类型，包括 `null` 和 `undefined` 。
```ts
// 不要这样做！
const foo = {num: 7};
const bar = {num: 5, ...(shouldUseFoo && foo)}; // 展开运算符有可能作用于 undefined。
// 不要这样做！这会创建出一个没有 length 属性的对象 {0: 'a', 1: 'b', 2: 'c'}。
const fooStrings = ['a', 'b', 'c'];
const ids = {...fooStrings};
// 应当这样做！在创建对象时展开对象。
const foo = shouldUseFoo ? {num: 7} : {};
const bar = {num: 5, ...foo};

// 应当这样做！在创建数组时展开数组。
const fooStrings = ['a', 'b', 'c'];
const ids = [...fooStrings, 'd', 'e'];
```
## 3.12. 控制流语句 / 语句块
多行控制流语句必须使用大括号。
```ts
// 应当这样做！
for (let i = 0; i < x; i++) {
    doSomethingWith(i);
    andSomeMore();
}
if (x) {
    doSomethingWithALongMethodName(x);
}
// 不要这样做！
if (x)
    x.doFoo();
for (let i = 0; i < x; i++)
    doSomethingWithALongMethodName(i);
```
这条规则的例外时，能够写在同一行的 `if` 语句可以省略大括号。
```ts
// 可以这样做！
if (x) x.doFoo();
```
## 3.13. switch 语句
所有的 `switch` 语句都必须包含一个 `default` 分支，即使这个分支里没有任何代码。
```ts
// 应当这样做！
switch (x) {
    case Y:
        doSomethingElse();
        break;
    default:
        // 什么也不做。
}
```
非空语句组`（ case ... ）`不允许越过分支向下执行（编译器会进行检查）：
```ts
// 不能这样做！
switch (x) {
    case X:
        doSomething();
        // 不允许向下执行！
    case Y:
        // ...
}
```
空语句组可以这样做：
```ts
// 可以这样做！
switch (x) {
    case X:
    case Y:
        doSomething();
        break;
    default: // 什么也不做。
}
```
## 3.14. 相等性判断
必须使用三等号（ `===` ）和对应的不等号（ `!==`）。两等号会在比较的过程中进行类型转换，这非常容易导致难以理解的错误。并且在 JavaScript 虚拟机上，两等号的运行速度比三等号慢。参见 JavaScript 相等表 。
```ts
// 不要这样做！
if (foo == 'bar' || baz != bam) {
    // 由于发生了类型转换，会导致难以理解的行为。
}
// 应当这样做！
if (foo === 'bar' || baz !== bam) {
    // 一切都很好！
}
```
例外：和 `null` 字面量的比较可以使用 `==` 和 `!=` 运算符，这样能够同时覆盖 `null` 和 `undefined` 两种情况。
```ts
// 可以这样做！
if (foo == null) {
    // 不管 foo 是 null 还是 undefined 都会执行到这里。
}
```
## 3.15. 函数声明
使用 `function foo() { ... }` 的形式声明具名函数，包括嵌套在其它作用域中，例如其它函数内部的函数。

不要使用将函数表达式赋值给局部变量的写法（例如 `const x = function() {...};` ）。TypeScript 本身已不允许重新绑定函数，所以在函数声明中使用 const 来阻止重写函数是没有必要的。

例外：如果函数需要访问外层作用域的 this ，则应当使用将箭头函数赋值给变量的形式代替函数声明的形式。
```ts
// 应当这样做！
function foo() { ... }
// 不要这样做！
// 在有上一段代码中的函数声明的情况下，下面这段代码无法通过编译：
foo = () => 3;  // 错误：赋值表达式的左侧不合法。

// 因此像这样进行函数声明是没有必要的。
const foo = function() { ... }
```
请注意这里所说的函数声明（ `function foo() {}` ）和下面要讨论的函数表达式（ `doSomethingWith(function() {});` ）之间的区别。

顶层箭头函数可以用于显式地声明这一函数实现了一个接口。
```ts
interface SearchFunction {
    (source: string, subString: string): boolean;
}

const fooSearch: SearchFunction = (source, subString) => { ... };
```
## 3.16. 函数表达式
### 3.16.1. 在表达式中使用箭头函数
不要使用 ES6 之前使用 `function` 关键字定义函数表达式的版本。应当使用箭头函数。
```ts
// 应当这样做！
bar(() => { this.doSomething(); })
// 不要这样做！
bar(function() { ... })
```
只有当函数需要动态地重新绑定 `this` 时，才能使用 `function` 关键字声明函数表达式，但是通常情况下代码中不应当重新绑定 `this` 。常规函数（相对于箭头函数和方法而言）不应当访问 `this` 。

### 3.16.2. 表达式函数体 和 代码块函数体
使用箭头函数时，应当根据具体情况选择表达式或者代码块作为函数体。
```ts
// 使用函数声明的顶层函数。
function someFunction() {
    // 使用代码块函数体的箭头函数，也就是使用 => { } 的函数，没问题：
    const receipts = books.map((b: Book) => {
        const receipt = payMoney(b.price);
        recordTransaction(receipt);
        return receipt;
    });

    // 如果用到了函数的返回值的话，使用表达式函数体也没问题：
    const longThings = myValues.filter(v => v.length > 1000).map(v => String(v));

    function payMoney(amount: number) {
        // 函数声明也没问题，但是不要在函数中访问 this。
    }
}
```
只有在确实需要用到函数返回值的情况下才能使用表达式函数体。
```ts
// 不要这样做！如果不需要函数返回值的话，应当使用代码块函数体（{ ... }）。
myPromise.then(v => console.log(v));
// 应当这样做！使用代码块函数体。
myPromise.then(v => {
    console.log(v);
});

// 应当这样做！即使需要函数返回值，也可以为了可读性使用代码块函数体。
const transformed = [1, 2, 3].map(v => {
    const intermediate = someComplicatedExpr(v);
    const more = acrossManyLines(intermediate);
    return worthWrapping(more);
});
```
### 3.16.3. 重新绑定 this
不要在函数表达式中使用 `this` ，除非它们明确地被用于重新绑定 `this` 指针。大多数情况下，使用箭头函数或者显式指定函数参数都能够避免重新绑定 `this` 的需求。
```ts
// 不要这样做！
function clickHandler() {
    // 这里的 this 到底指向什么？
    this.textContent = 'Hello';
}

// 不要这样做！this 指针被隐式地设为 document.body。
document.body.onclick = clickHandler;
// 应当这样做！在箭头函数中显式地对对象进行引用。
document.body.onclick = () => { document.body.textContent = 'hello'; };

// 可以这样做！函数显式地接收一个参数。
const setTextFn = (e: HTMLElement) => { e.textContent = 'hello'; };
document.body.onclick = setTextFn.bind(null, document.body);
```
### 3.16.4. 使用箭头函数作为属性
通常情况下，类不应该将任何属性初始化为箭头函数。箭头函数属性需要调用函数意识到被调用函数的 `this` 已经被绑定了，这让 this 的指向变得令人费解，也让对应的调用和引用在形式上看着似乎是不正确的，也就是说，需要额外的信息才能确认这样的使用方式是正确的。在调用实例方法时，必须使用箭头函数的形式（例如 `const handler = (x) => { this.listener(x); };` ）。此外，不允许持有或传递实例方法的引用（例如不要使用 `const handler = this.listener; handler(x);` 的写法）。

Tip

>在一些特殊的情况下，例如需要将函数绑定到模板时，使用箭头函数作为属性是很有用的做法，同时还能令代码的可读性提高。因此，在这些情况下对于这条规则可视具体情况加以变通。此外， 事件句柄 一节中有相关讨论。
```ts
// 不要这样做！
class DelayHandler {
    constructor() {
        // 这里有个问题，回调函数里的 this 指针不会被保存。
        // 因此回调函数里的 this 不再是 DelayHandler 的实例了。
        setTimeout(this.patienceTracker, 5000);
    }
    private patienceTracker() {
        this.waitedPatiently = true;
    }
}
// 不要这样做！一般而言不应当使用箭头函数作为属性。
class DelayHandler {
    constructor() {
        // 不要这样做！这里看起来就是像是忘记了绑定 this 指针。
        setTimeout(this.patienceTracker, 5000);
    }
    private patienceTracker = () => {
        this.waitedPatiently = true;
    }
}
// 应当这样做！在调用时显式地处理 this 指针的指向问题。
class DelayHandler {
    constructor() {
        // 在这种情况下，应尽可能使用匿名函数。
        setTimeout(() => {
            this.patienceTracker();
        }, 5000);
    }
    private patienceTracker() {
        this.waitedPatiently = true;
    }
}
```
### 3.16.5. 事件句柄
对于事件句柄，如果它不需要被卸载的话，可以使用箭头函数的形式，例如事件是由类自身发送的情况。如果句柄必须被卸载，则应当使用箭头函数属性，因为箭头函数属性能够自动正确地捕获 `this` 指针，并且能够提供一个用于卸载的稳定引用。
```ts
// 应当这样做！事件句柄可以使用匿名函数或者箭头函数属性的形式。
class Component {
    onAttached() {
        // 事件是由类本身发送的，因此这个句柄不需要卸载。
        this.addEventListener('click', () => {
            this.listener();
        });
        // 这里的 this.listener 是一个稳定引用，因此可以在之后被卸载。
        window.addEventListener('onbeforeunload', this.listener);
    }
    onDetached() {
        // 这个事件是由 window 发送的。如果不卸载这个句柄，this.listener
        // 会因为绑定了 this 而保存对 this 的引用，从而导致内存泄漏。
        window.removeEventListener('onbeforeunload', this.listener);
    }
    // 使用箭头函数作为属性能够自动地正确绑定 this 指针。
    private listener = () => {
        confirm('Do you want to exit the page?');
    }
}
```
不要在注册事件句柄的表达式中使用 bind ，这会创建一个无法卸载的临时引用。
```ts
// 不要这样做！对句柄使用 bind 会创建一个无法卸载的临时引用。
class Component {
    onAttached() {
        // 这里创建了一个无法卸载的临时引用。
        window.addEventListener('onbeforeunload', this.listener.bind(this));
    }
    onDetached() {
        // 这里的 bind 创建了另一个引用，所以这一行代码实际上没有实现任何功能。
        window.removeEventListener('onbeforeunload', this.listener.bind(this));
    }
    private listener() {
        confirm('Do you want to exit the page?');
    }
}
```
## 3.17. 自动分号插入
不要依赖自动分号插入（ASI），必须显式地使用分号结束每一个语句。这能够避免由于不正确的分号插入所导致的 Bug，也能够更好地兼容对 ASI 支持有限的工具（例如 clang-format）。

## 3.18. @ts-ignore
不要使用 `@ts-ignore` 。表面上看，这是一个“解决”编译错误的简单方法，但实际上，编译错误往往是由其它更大的问题导致的，因此正确的做法是直接解决这些问题本身。

举例来说，如果使用 `@ts-ignore` 关闭了一个类型错误，那么便很难推断其它相关代码最终会接收到何种类型。对于许多与类型相关的错误， `any` 类型 一节有一些关于如何正确使用 `any` 的有用的建议。

## 3.19. 类型断言与非空断言
类型断言（ `x as SomeType` ）和非空断言（ `y!` ）是不安全的。这两种语法只能够绕过编译器，而并不添加任何运行时断言检查，因此有可能导致程序在运行时崩溃。

因此，除非有明显或确切的理由，否则 不应 使用类型断言和非空断言。
```ts
// 不要这样做！
(x as Foo).foo();

y!.bar();
```
如果希望对类型和非空条件进行断言，最好的做法是显式地编写运行时检查。
```ts
// 应当这样做！

// 这里假定 Foo 是一个类。
if (x instanceof Foo) {
    x.foo();
}

if (y) {
    y.bar();
}
```
有时根据代码中的上下文可以确定某个断言必然是安全的。在这种情况下， 应当 添加注释详细地解释为什么这一不安全的行为可以被接受：
```ts
// 可以这样做！

// x 是一个 Foo 类型的示例，因为……
(x as Foo).foo();

// y 不可能是 null，因为……
y!.bar();
```
如果使用断言的理由很明显，注释就不是必需的。例如，生成的协议代码总是可空的，但有时根据上下文可以确认其中某些特定的由后端提供的字段必然不为空。在这些情况下应当根据具体场景加以判断和变通。

### 3.19.1. 类型断言语法
类型断言必须使用 as 语法，不要使用尖括号语法，这样能强制保证在断言外必须使用括号。
```ts
// 不要这样做！
const x = (<Foo>z).length;
const y = <Foo>z.length;
// 应当这样做！
const x = (z as Foo).length;
```
### 3.19.2. 类型断言和对象字面量
使用类型标记（ `: Foo` ）而非类型断言（ `as Foo` ）标明对象字面量的类型。在日后对接口的字段类型进行修改时，前者能够帮助程序员发现 Bug。
```ts
interface Foo {
    bar: number;
    baz?: string;  // 这个字段曾经的名称是“bam”，后来改名为“baz”。
}

const foo = {
    bar: 123,
    bam: 'abc',  // 如果使用类型断言，改名之后这里并不会报错！
} as Foo;

function func() {
    return {
        bar: 123,
        bam: 'abc',  // 如果使用类型断言，改名之后这里也不会报错！
    } as Foo;
}
```
## 3.20. 成员属性声明
接口和类的声明必须使用 `;` 分隔每个成员声明。
```ts
// 应当这样做！
interface Foo {
    memberA: string;
    memberB: number;
}
```
为了与类的写法保持一致，不要在接口中使用 , 分隔字段。
```ts
// 不要这样做！
interface Foo {
    memberA: string,
    memberB: number,
}
```
然而，内联对象类型声明必须使用 , 作为分隔符。
```ts
// 应当这样做！
type SomeTypeAlias = {
    memberA: string,
    memberB: number,
};

let someProperty: {memberC: string, memberD: number};
```
### 3.20.1. 优化属性访问的兼容性
不要混用方括号属性访问和句点属性访问两种形式。
```ts
// 不要这样做！
// 必须从两种形式中选择其中一种，以保证整个程序的一致性。
console.log(x['someField']);
console.log(x.someField);
```
代码应当尽可能为日后的属性重命名需求进行优化，并且为所有程序外部的对象属性声明对应的字段。
```ts
// 应当这样做！声明一个对应的接口。
declare interface ServerInfoJson {
    appVersion: string;
    user: UserJson;
}
const data = JSON.parse(serverResponse) as ServerInfoJson;
console.log(data.appVersion); // 这里是类型安全的，如果需要重命名也是安全的！
```
### 3.20.2. 优化模块对象导入的兼容性
导入模块对象时应当直接访问对象上的属性，而不要传递对象本身的引用，以保证模块能够被分析和优化。也可以将导入的模块视作命名空间，参见 **选择模块导入还是解构导入？** 一节。
```ts
// 应当这样做！
import {method1, method2} from 'utils';
class A {
    readonly utils = {method1, method2};
}
// 不要这样做！
import * as utils from 'utils';
class A {
    readonly utils = utils;
}
```
### 3.20.3. 例外情况
这里所提到的优化规则适用于所有的 Web 应用，但不需要强制应用于只运行在服务端的程序。不过，出于代码整洁性的考虑，这里仍然强烈建议声明所有的类型，并且避免混用两种属性访问的形式。

## 3.21. 枚举
对于枚举类型，必须使用 `enum` 关键字，但不要使用 `const enum` 。TypeScript 的枚举类型本身就是不可变的， `const enum` 的写法是另一种独立的语言特性，其目的是让枚举对 JavaScript 程序员透明。

## 3.22. debugger 语句
不允许在生产环境代码中添加 debugger 语句。
```ts
// 不要这样做！
function debugMe() {
    debugger;
}
```
## 3.23. 装饰器
装饰器以 `@` 为前缀，例如 `@MyDecorator` 。

不要定义新的装饰器，只使用框架中已定义的装饰器，例如：

- Angular（例如 `@Component` 、 `@NgModule` 等等）
- Polymer（例如 `@property` 等等）

为什么？

通常情况下，应当避免使用装饰器。这是由于装饰器是一个实验性功能，仍然处于 TC39 委员会的提案阶段，且目前存在已知的无法被修复的 Bug。

使用装饰器时，装饰器必须紧接被装饰的符号，中间不允许有空行。
```ts
/** JSDoc 注释应当位于装饰器之前 */
@Component({...})  // 装饰器之后不能有空行。
class MyComp {
    @Input() myField: string;  // 字段的装饰器和和字段位于同一行……

    @Input()
    myOtherField: string;  // ……或位于字段之前。
}
```

# 4. 代码管理
## 4.1. 模块
### 4.1.1. 导入路径
TypeScript 代码必须使用路径进行导入。这里的路径既可以是相对路径，以 `.` 或 `..` 开头，也可以是从项目根目录开始的绝对路径，如 `root/path/to/file` 。

在引用逻辑上属于同一项目的文件时，应使用相对路径 `./foo` ，不要使用绝对路径 `path/to/foo` 。

应尽可能地限制父层级的数量（避免出现诸如 `../../../` 的路径），过多的层级会导致模块和路径结构难以理解。
```ts
import {Symbol1} from 'google3/path/from/root';
import {Symbol2} from '../parent/file';
import {Symbol3} from './sibling';
```
### 4.1.2. 用 命名空间 还是 模块？
在 TypeScript 有两种组织代码的方式：命名空间（`namespace`）和模块（`module`）。

不允许使用命名空间，在 TypeScript 中必须使用模块（即 ES6 模块 ）。也就是说，在引用其它文件中的代码时必须以 `import {foo} from 'bar'` 的形式进行导入和导出。

不允许使用 namespace Foo { ... } 的形式组织代码。命名空间只能在所用的外部第三方库有要求时才能使用。如果需要在语义上对代码划分命名空间，应当通过分成不同文件的方式实现。

不允许在导入时使用 `require` 关键字（形如 `import x = require('...');` ）。应当使用 ES6 的模块语法。
```ts
// 不要这样做！不要使用命名空间！
namespace Rocket {
    function launch() { ... }
}

// 不要这样做！不要使用 <reference> ！
/// <reference path="..."/>

// 不要这样做！不要使用 require() ！
import x = require('mydep');
```
Tip

>TypeScript 的命名空间早期也被称为内部模块并使用 `module` 关键字，形如 `module Foo { ... }` 。不要使用这种用法。任何时候都应当使用 ES6 的导入语法。

## 4.2. 导出
代码中必须使用具名的导出声明。
```ts
// Use named exports:
export class Foo { ... }
```
不要使用默认导出，这样能保证所有的导入语句都遵循统一的范式：
```ts
// 不要这样做！不要使用默认导出！
export default class Foo { ... }
```
为什么？因为默认导出并不为被导出的符号提供一个标准的名称，这增加了维护的难度和降低可读性的风险，同时并未带来明显的益处。如下面的例子所示：
```ts
// 默认导出会造成如下的弊端
import Foo from './bar';  // 这个语句是合法的。
import Bar from './bar';  // 这个语句也是合法的。
```
具名导出的一个优势是，当代码中试图导入一个并未被导出的符号时，这段代码会报错。例如，假设在 `foo.ts` 中有如下的导出声明：
```ts
// 不要这样做！
const foo = 'blah';
export default foo;
```
如果在 bar.ts 中有如下的导入语句：
```ts
// 编译错误！
import {fizz} from './foo';
```
会导致编译错误： `error TS2614: Module '"./foo"' has no exported member 'fizz'` 。反之，如果在 `bar.ts` 中的导入语句为：
```ts
// 不要这样做！这定义了一个多余的变量 fizz！
import fizz from './foo';
```
结果是 `fizz === foo` ，这往往不符合预期，且难以调试。

此外，默认导出会鼓励程序员将所有内容全部置于一个巨大的对象当中，这个对象实际上充当了命名空间的角色：
```ts
// 不要这样做！
export default class Foo {
    static SOME_CONSTANT = ...
    static someHelpfulFunction() { ... }
    ...
}
```
显然，这个文件中具有文件作用域，它可以被用做命名空间。但是，这里创建了第二个作用域——类 `Foo` ，这个类在其它文件中具有歧义：它既可以被视为类型，又可以被视为值。

因此，应当使用文件作用域作为实质上的命名空间，同时使用具名的导出声明：
```ts
// 应当这样做！
export const SOME_CONSTANT = ...
export function someHelpfulFunction()
export class Foo {
    // 只有类 Foo 中的内容
}
```
### 4.2.1. 导出可见性
TypeScript 不支持限制导出符号的可见性。因此，不要导出不用于模块以外的符号。一般来说，应当尽量减小模块的外部 API 的规模。

### 4.2.2. 可变导出
虽然技术上可以实现，但是可变导出会造成难以理解和调试的代码，尤其是对于在多个模块中经过了多次重新导出的符号。这条规则的一个例子是，不允许使用 export let 。
```ts
// 不要这样做！
export let foo = 3;
// 在纯 ES6 环境中，变量 foo 是一个可变值，导入了 foo 的代码会观察到它的值在一秒钟之后发生了改变。
// 在 TypeScript 中，如果 foo 被另一个文件重新导出了，导入该文件的代码则不会观察到变化。
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);
```
如果确实需要允许外部代码对可变值进行访问，应当提供一个显式的取值器。
```ts
// 应当这样做！
let foo = 3;
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);
// 使用显式的取值器对可变导出进行访问。
export function getFoo() { return foo; };
```
有一种常见的编程情景是，要根据某种特定的条件从两个值中选取其中一个进行导出：先检查条件，然后导出。这种情况下，应当保证模块中的代码执行完毕后，导出的结果就是确定的。
```ts
function pickApi() {
    if (useOtherApi()) return OtherApi;
    return RegularApi;
}
export const SomeApi = pickApi();
```
### 4.2.3. 容器类
不要为了实现命名空间创建含有静态方法或属性的容器类。
```ts
// 不要这样做！
export class Container {
    static FOO = 1;
    static bar() { return 1; }
}
```
应当将这些方法和属性设为单独导出的常数和函数。
```ts
// 应当这样做！
export const FOO = 1;
export function bar() { return 1; }
```
## 4.3. 导入
在 ES6 和 TypeScript 中，导入语句共有四种变体：

| 导入类型 | 示例 |	用途 |
| - | - | - |
| 模块 | `import * as foo from '...';` | TypeScript 导入方式 |
| 解构 | `import {SomeThing} from '...';` | TypeScript 导入方式 |
| 默认 | `import SomeThing from '...';` | 只用于外部代码的特殊需求 |
| 副作用 | `import '...';` | 只用于加载某些库的副作用（例如自定义元素） |
```ts
// 应当这样做！从这两种变体中选择较合适的一种（见下文）。
import * as ng from '@angular/core';
import {Foo} from './foo';

// 只在有需要时使用默认导入。
import Button from 'Button';

// 有时导入某些库是为了其代码执行时的副作用。
import 'jasmine';
import '@polymer/paper-button';
```
### 4.3.1. 选择模块导入还是解构导入？
根据使用场景的不同，模块导入和解构导入分别有其各自的优势。

虽然模块导入语句中出现了通配符 `*` ，但模块导入并不能因此被视为其它语言中的通配符导入。相反地，模块导入语句为整个模块提供了一个名称，模块中的所有符号都通过这个名称进行访问，这为代码提供了更好的可读性，同时令模块中的所有符号可以进行自动补全。模块导入减少了导入语句的数量（模块中的所有符号都可以使用），降低了命名冲突的出现几率，同时还允许为被导入的模块提供一个简洁的名称。在从一个大型 API 中导入多个不同的符号时，模块导入语句尤其有用。

解构导入语句则为每一个被导入的符号提供一个局部的名称，这样在使用被导入的符号时，代码可以更简洁。对那些十分常用的符号，例如 Jasmine 的 describe 和 it 来说，这一点尤其有用。
```ts
// 不要这样做！无意义地使用命名空间中的名称使得导入语句过于冗长。
import {TableViewItem, TableViewHeader, TableViewRow, TableViewModel,
TableViewRenderer} from './tableview';
let item: TableViewItem = ...;
// 应当这样做！使用模块作为命名空间。
import * as tableview from './tableview';
let item: tableview.Item = ...;
import * as testing from './testing';

// 所有的测试都只会重复地使用相同的三个函数。
// 如果只需要导入少数几个符号，而这些符号的使用频率又非常高的话，
// 也可以考虑使用解构导入语句直接导入这几个符号（见下文）。
testing.describe('foo', () => {
testing.it('bar', () => {
    testing.expect(...);
    testing.expect(...);
});
});
// 这样做更好！为这几个常用的函数提供局部变量名。
import {describe, it, expect} from './testing';

describe('foo', () => {
it('bar', () => {
    expect(...);
    expect(...);
});
});
...
```
### 4.3.2. 重命名导入
在代码中，应当通过使用模块导入或重命名导出解决命名冲突。此外，在需要时，也可以使用重命名导入（例如 `import {SomeThing as SomeOtherThing}` ）。

在以下几种情况下，重命名导入可能较为有用：

- 避免与其它导入的符号产生命名冲突。
- 被导入符号的名称是自动生成的。
- 被导入符号的名称不能清晰地描述其自身，需要通过重命名提高代码的可读性，如将 `RxJS` 的 `from` 函数重命名为 `observableFrom` 。
### 4.3.3. import type 和 export type
不要使用 `import type ... from` 或者 `export type ... from` 。

Tip

>这一规则不适用于导出类型定义，如 `export type Foo = ...;` 。
```ts
// 不要这样做！
import type {Foo} from './foo';
export type {Bar} from './bar';
```
应当使用常规的导入语句。
```ts
// 应当这样做！
import {Foo} from './foo';
export {Bar} from './bar';
```
TypeScript 的工具链会自动区分用作类型的符号和用作值的符号。对于类型引用，工具链不会生成运行时加载的代码。这样做的原因是为了提供更好的开发体验，否则在 `import type` 和 `import` 之间反复切换会非常繁琐。同时， `import type` 并不提供任何保证，因为代码仍然可以通过其它的途径导入同一个依赖。

如果需要在运行时加载代码以执行其副作用，应使用 `import '...'` ，参见 **导入** 一节。

使用 `export type` 似乎可以避免将某个用作值的符号导出为 API。然而，和 `import type` 类似， `export type` 也不提供任何保证，因为外部代码仍然可以通过其它途径导入。如果需要拆分对 API 作为值的使用和作为类型的使用，并保证二者不被混用的话，应当显式地将其拆分成不同的符号，例如 `UserService` 和 `AjaxUserService` ，这样不容易造成错误，同时能更好地表达设计思路。

## 4.4. 根据特征组织代码
应当根据特征而非类型组织代码。例如，一个在线商城的代码应当按照 `products` ， `checkout` ， `backend` 等分类，而不是 `views` ， `models` ， `controllers` 。


# 5. 类型系统
## 5.1. 类型推导
对于所有类型的表达式（包括变量、字段、返回值，等等），都可以依赖 TypeScript 编译器所实现的类型推导。 google3 编译器会拒绝所有缺少类型记号又无法推导出其类型的代码，以保证所有的代码都具有类型（即使其中可能包括显式的 `any` 类型）。
```ts
const x = 15;  // x 的类型可以推导得出.
```
当变量或参数被初始化为 `string` ， `number` ， `boolean` ， `RegExp` 正则表达式字面量或 `new` 表达式时，由于明显能够推导出类型，因此应当省略类型记号。
```ts
// 不要这样做！添加 boolean 记号对提高可读性没有任何帮助！
const x: boolean = true;
// 不要这样做！Set 类型显然可以从初始化语句中推导得出。
const x: Set<string> = new Set();
// 应当这样做！依赖 TypeScript 的类型推导。
const x = new Set<string>();
```
对于更为复杂的表达式，类型记号有助于提高代码的可读性。此时是否使用类型记号应当由代码审查员决定。

### 5.1.1. 返回类型
代码的作者可以自由决定是否在函数和方法中使用类型记号标明返回类型。代码审查员 可以 要求对难以理解的复杂返回类型使用类型记号进行阐明。项目内部 可以 自行规定必须标明返回值，本文作为一个通用的 TypeScript 风格指南，不做硬性要求。

显式地标明函数和方法的返回值有两个优点：

- 能够生成更精确的文档，有助于读者理解代码。
- 如果未来改变了函数的返回类型的话，可以让因此导致的潜在的错误更快地暴露出来。
## 5.2. `Null` 还是 `Undefined` ？
TypeScript 支持 `null` 和 `undefined` 类型。可空类型可以通过联合类型实现，例如 `string | null` 。对于 `undefined` 也是类似的。对于 `null` 和 `undefined` 的联合类型，并无特殊的语法。

TypeScript 代码中可以使用 `undefined` 或者 `null` 标记缺少的值，这里并无通用的规则约定应当使用其中的某一种。许多 JavaScript API 使用 `undefined` （例如 `Map.get` ），然而 DOM 和 Google API 中则更多地使用 `null` （例如 `Element.getAttribute` ），因此，对于 `null` 和 `undefined` 的选择取决于当前的上下文。

### 5.2.1. 可空/未定义类型别名
不允许 为包括 `|null` 或 `|undefined` 的联合类型创建类型别名。这种可空的别名通常意味着空值在应用中会被层层传递，并且它掩盖了导致空值出现的源头。另外，这种别名也让类或接口中的某个值何时有可能为空变得不确定。

因此，代码 必须 在使用别名时才允许添加 `|null` 或者 `|undefined` 。同时，代码 应当 在空值出现位置的附近对其进行处理。
```ts
// 不要这样做！不要在创建别名的时候包含 undefined ！
type CoffeeResponse = Latte|Americano|undefined;

class CoffeeService {
    getLatte(): CoffeeResponse { ... };
}
// 应当这样做！在使用别名的时候联合 undefined ！
type CoffeeResponse = Latte|Americano;

class CoffeeService {
    getLatte(): CoffeeResponse|undefined { ... };
}
// 这样做更好！使用断言对可能的空值进行处理！
type CoffeeResponse = Latte|Americano;

class CoffeeService {
    getLatte(): CoffeeResponse {
        return assert(fetchResponse(), 'Coffee maker is broken, file a ticket');
    };
}
```
### 5.2.2. 可选参数 还是 undefined 类型？
TypeScript 支持使用 `?` 创建可选参数和可选字段，例如：
```ts
interface CoffeeOrder {
    sugarCubes: number;
    milk?: Whole|LowFat|HalfHalf;
}

function pourCoffee(volume?: Milliliter) { ... }
```
可选参数实际上隐式地向类型中联合了 `|undefined` 。不同之处在于，在构造类实例或调用方法时，可选参数可以被直接省略。例如， `{sugarCubes: 1}` 是一个合法的 CoffeeOrder ，因为 milk 字段是可选的。

应当使用可选字段（对于类或者接口）和可选参数而非联合 `|undefined` 类型。

对于类，应当尽可能避免使用可选字段，尽可能初始化每一个字段。
```ts
class MyClass {
    field = '';
}
```
## 5.3. 结构类型 与 指名类型
TypeScript 的类型系统使用的是结构类型而非指名类型。具体地说，一个值，如果它拥有某个类型的所有属性，且所有属性的类型能够递归地一一匹配，则这个值与这个类型也是匹配的。

在代码中，可以在适当的场景使用结构类型。具体地说，在测试代码之外，应当使用接口而非类对结构类型进行定义。在测试代码中，由于经常要创建 Mock 对象用于测试，此时不引入额外的接口往往较为方便。

在提供基于结构类型的实现时，应当在符号的声明位置显式地包含其类型，使类型检查和错误检测能够更准确地工作。
```ts
// 应当这样做！
const foo: Foo = {
    a: 123,
    b: 'abc',
}
// 不要这样做！
const badFoo = {
    a: 123,
    b: 'abc',
}
```
为什么要这样做？

这是因为在上文中， `badFoo` 对象的类型依赖于类型推导。 `badFoo` 对象中可能添加额外的字段，此时类型推导的结果就有可能发生变化。

如果将 `badFoo` 传给接收 `Foo` 类型参数的函数，错误提示会出现在函数调用的位置，而非对象声明的位置。在大规模的代码仓库中修改接口时，这一点区别会很重要。
```ts
interface Animal {
    sound: string;
    name: string;
}

function makeSound(animal: Animal) {}

/**
 * 'cat' 的类型会被推导为 '{sound: string}'
 */
const cat = {
    sound: 'meow',
};

/**
 * 'cat' 的类型并不满足函数参数的要求，
 * 因此 TypeScript 编译器会在这里报错，
 * 而这里有可能离 'cat' 的定义相当远。
 */
makeSound(cat);

/**
 * Horse 具有结构类型，因此这里会提示类型错误，而函数调用点不会报错。
 * 这是因为 'horse' 不满足接口 'Animal' 的类型约定。
 */
const horse: Animal = {
    sound: 'niegh',
};

const dog: Animal = {
    sound: 'bark',
    name: 'MrPickles',
};

makeSound(dog);
makeSound(horse);
```
## 5.4. 接口 还是 类型别名？
TypeScript 支持使用 类型别名 为类型命名。这一功能可以用于基本类型、联合类型、元组以及其它类型。

然而，当需要声明用于对象的类型时，应当使用接口，而非对象字面量表达式的类型别名。
```ts
// 应当这样做！
interface User {
    firstName: string;
    lastName: string;
}
// 不要这样做！
type User = {
    firstName: string,
    lastName: string,
}
```
为什么？

这两种形式是几乎等价的，因此，基于从两个形式中只选择其中一种以避免项目中出现变种的原则，这里选择了更常见的接口形式。另外，这里选择接口还有一个 有趣的技术原因 。这篇博文引用了 TypeScript 团队负责人的话：“老实说，我个人的意见是对于任何可以建模的对象都应当使用接口。相比之下，使用类型别名没有任何优势，尤其是类型别名有许多的显示和性能问题”。

## 5.5. Array<T> 类型
对于简单类型（名称中只包含字母、数字和点 `.` 的类型），应当使用数组的语法糖 `T[]` ，而非更长的 `Array<T>` 形式。

对于其它复杂的类型，则应当使用较长的 `Array<T>` 。

这条规则也适用于 `readonly T[]` 和 `ReadonlyArray<T>` 。
```ts
// 应当这样做！
const a: string[];
const b: readonly string[];
const c: ns.MyObj[];
const d: Array<string|number>;
const e: ReadonlyArray<string|number>;
// 不要这样做！
const f: Array<string>;            // 语法糖写法更短。
const g: ReadonlyArray<string>;
const h: {n: number, s: string}[]; // 大括号和中括号让这行代码难以阅读。
const i: (string|number)[];
const j: readonly (string|number)[];
```
## 5.6. 索引类型 `{[key: string]: number}`
在 JavaScript 中，使用对象作为关联数组（又称“映射表”、“哈希表”或者“字典”）是一种常见的做法：
```ts
const fileSizes: {[fileName: string]: number} = {};
fileSizes['readme.txt'] = 541;
```
在 TypeScript 中，应当为键提供一个有意义的标签名。（当然，这个标签只有在文档中有实际意义，在其它场合是无用的。）
```ts
// 不要这样做！
const users: {[key: string]: number} = ...;
// 应当这样做！
const users: {[userName: string]: number} = ...;
```
然而，相比使用上面的这种形式，在 TypeScript 中应当考虑使用 ES6 新增的 Map 与 Set 类型。因为 JavaScript 对象有一些 令人困惑又不符合预期的行为 ，而 ES6 的新增类型能够更明确地表达程序员的设计思路。此外， Map 类型的键和 Set 类型的元素都允许使用 string 以外的其他类型。

TypeScript 内建的 `Record<Keys, ValueType>` 允许使用已定义的一组键创建类型。它与关联数组的不同之处在于键是静态确定的。关于它的使用建议，参见 **映射类型与条件类型** 一节。

## 5.7. 映射类型与条件类型
TypeScript 中的 映射类型 与 条件类型 让程序员能够在已有类型的基础上构建出新的类型。在 TypeScript 的标准库中有许多类型运算符都是基于这一机制（例如 `Record` 、 `Partial` 、 `Readonly` 等等）。

TypeScript 类型系统的这一特性让创建新类型变得简洁，还程序员在设计代码抽象时，既能实现强大的功能，同时海能保证类型安全。然而，它们也有一些缺点：

相较于显式地指定属性与类型间关系（例如使用接口和继承，参见下文中的例子），类型运算符需要读者在头脑中自行对后方的类型表达式进行求值。本质上说，这增加了程序的理解难度，尤其是在类型推导和类型表达式有可能横跨数个文件的情况下。
映射类型与条件类型的求值模型并没有明确的规范，且经常随着 TypeScript 编译器的版本更新而发生变化，因此并不总是易于理解，尤其是与类型推导一同使用时。因此，代码有可能只是碰巧能够通过编译或者给出正确的结果。在这种情况下，使用类型运算符增加了代码未来的维护成本。
映射类型与条件类型最为强大之处在于，它们能够从复杂且/或推导的类型中派生出新的类型。然而从另一方面看，这样做也很容易导致程序难于理解与维护。
有些语法工具并不能够很好地支持类型系统的这一特性。例如，一些 IDE 的“查找引用”功能（以及依赖于它的“重命名重构”）无法发现位于 `Pick<T, Keys>` 类型中的属性，因而在查找结果中不会将其设为高亮。
因此，推荐的代码规范如下：

- 任何使用都应当使用最简单的类型构造方式进行表达。
- 一定程度的重复或冗余，往往好过复杂的类型表达式带来的长远维护成本。
- 映射类型和条件类型必须在符合上述理念的情况下使用。
例如，TypeScript 内建的 `Pick<T, Keys>` 类型允许以类型 T 的子集创建新的类型。然而，使用接口和继承的方式实现往往更易于理解。
```ts
interface User {
    shoeSize: number;
    favoriteIcecream: string;
    favoriteChocolate: string;
}

// FoodPreferences 类型拥有 favoriteIcecream 和 favoriteChocolate，但不包括 shoeSize。
type FoodPreferences = Pick<User, 'favoriteIcecream'|'favoriteChocolate'>;
```
这种写法等价于显式地写出 FoodPreferences 的属性：
```ts
interface FoodPreferences {
    favoriteIcecream: string;
    favoriteChocolate: string;
}
```
为了减少重复，可以让 `User` 继承 `FoodPreferences` ，或者在 `User` 中嵌套一个类型为 `FoodPrefences` 的字段（这样做可能更好）：
```ts
interface FoodPreferences { /* 同上 */ }

interface User extends FoodPreferences {
    shoeSize: number;
    // 这样 User 也包括了 FoodPreferences 的字段。
}
```
使用接口让属性的分类变得清晰，IDE 的支持更完善，方便进一步优化，同时使得代码更易于理解。

## 5.8. any 类型
TypeScript 的 `any` 类型是所有其它类型的超类，又是所有其它类型的子类，同时还允许解引用一切属性。因此，使用 `any` 十分危险——它会掩盖严重的程序错误，并且它从根本上破坏了对应的值“具有静态属性”的原则。

尽可能 不要 使用 `any` 。如果出现了需要使用 `any` 的场景，可以考虑下列的解决方案：

- 提供一个更具体的类型
- 使用 unknown 而非 any
- 关闭 Lint 工具对 any 的警告
### 5.8.1. 提供一个更具体的类型
使用接口、内联对象类型、或者类型别名：
```ts
// 声明接口类型以表示服务端发送的 JSON。
declare interface MyUserJson {
    name: string;
    email: string;
}

// 对重复出现的类型使用类型别名。
type MyType = number|string;

// 或者对复杂的返回类型使用内联对象类型。
function getTwoThings(): {something: number, other: string} {
    // ...
    return {something, other};
}

// 使用泛型，有些库在这种情况下可能会使用 any 表示
// 这里并不考虑函数所作用于的参数类型。
// 注意，对于这种写法，“只有泛型的返回类型”一节有更详细的规范。
function nicestElement<T>(items: T[]): T {
    // 在 items 中查找最棒的元素。
    // 这里还可以进一步为泛型参数 T 添加限制，例如 <T extends HTMLElement>。
}
```
### 5.8.2. 使用 unknown 而非 any
`any` 类型的值可以赋给其它任何类型，还可以对其解引用任意属性。一般来说，这个行为不是必需的，也不符合期望，此时代码试图表达的内容其实是“该类型是未知的”。在这种情况下，应当使用内建的 `unknown` 类型。它能够表达相同的语义，并且，因为 `unknown` 不能解引用任意属性，它较 `any` 而言更为安全。
```ts
// 应当这样做！
// 可以将任何值（包括 null 和 undefined）赋给 val，
// 但在缩窄类型或者类型转换之前并不能使用它。
const val: unknown = value;
// 不要这样做！
const danger: any = value /* 这是任意一个表达式的结果 */;
danger.whoops();  // 完全未经检查的访问！
```
### 5.8.3. 关闭 Lint 工具对 any 的警告
有时使用 `any` 是合理的，例如用于在测试中构造 Mock 对象。在这种情况下，应当添加注释关闭 Lint 工具对此的警告，并添加文档对使用 `any` 的合理性进行说明。
```ts
// 这个测试只需要部分地实现 BookService，否则测试会失败。
// 所以，这里有意地使用了一个不安全的部分实现 Mock 对象。
// tslint:disable-next-line:no-any
const mockBookService = ({get() { return mockBook; }} as any) as BookService;
// 购物车在这个测试里并未使用。
// tslint:disable-next-line:no-any
const component = new MyComponent(mockBookService, /* unused ShoppingCart */ null as any);
```
## 5.9. 元组类型
应当使用元组类型代替常见的 Pair 类型的写法：
```ts
// 不要这样做！
interface Pair {
    first: string;
    second: string;
}

function splitInHalf(input: string): Pair {
    // ...
    return {first: x, second: y};
}
// 应当这样做！
function splitInHalf(input: string): [string, string] {
    // ...
    return [x, y];
}

// 这样使用:
const [leftHalf, rightHalf] = splitInHalf('my string');
```
然而通常情况下，为属性提供一个有意义的名称往往能让代码更加清晰。

如果为此声明一个接口过于繁重的话，可以使用内联对象字面量类型：
```ts
function splitHostPort(address: string): {host: string, port: number} {
    // ...
}

// 这样使用:
const address = splitHostPort(userAddress);
use(address.port);

// 也可以使用解构进行形如元组的操作：
const {host, port} = splitHostPort(userAddress);
```
## 5.10. 包装类型
不要使用如下几种类型，它们是 JavaScript 中基本类型的包装类型：

- `String` 、 `Boolean` 和 `Number` 。它们的含义和对应的基本类型 `string` 、 `boolean` 和 `number` 略有不同。任何时候，都应当使用后者。
- `Object` 。它和 `{}` 与 `object` 类似，但包含的范围略微更大。应当使用 `{}` 表示“包括除 `null` 和 `undefined` 之外所有类型”的类型，使用 `object` 表示“所有基本类型以外”的类型（这里的“所有基本类型”包括上文中提到的基本类型， `symbol` 和 `bigint` ）。
此外，不要将包装类型用作构造函数。

## 5.11. 只有泛型的返回类型
不要创建返回类型只有泛型的 API。如果现有的 API 中存在这种情况，使用时应当显式地标明泛型参数类型。


# 6. 一致性
对于本文中并未明确解释的任何与代码风格有关的问题，都应当与同一文件中其它代码的现有写法 保持一致 。如果问题仍未得到解决，则应当参考同一文件夹下其它文件的写法。

## 6.1. 目标
通常情况下，程序员自己是最了解他们的代码需求的人。所以，对于那些答案不唯一、而且最优解取决于实际场景的问题，一般应当由当事人根据情况自行决定解决方案。因此，对于这类问题，默认回答往往都是“不管了”。

以下几点则是其中的特例，它们解释了为什么要在这篇风格指南中编写全局性的规范。对于程序员自行规定的代码风格，应当根据以下几个原则对其进行评估：

### 6.1.1. 应当避免使用已知的会导致问题的代码范式，尤其是对于这门语言的新手而言
例如：

- `any` 是一个容易被误用的类型（某个变量 真的 可以既是一个数字，同时还可以作为函数被调用吗？），因此关于它的用法，指南中提出了一些建议。
- TypeScript 的命名空间会为闭包优化带来问题。
- 在文件名中使用句点 `.` 会让导入语句的样式变得不美观且令人困惑。
- 类中的静态函数对优化十分不友好，同样的功能完全可以由文件级函数实现。
- 不熟悉 `private` 关键字的用户会试图使用下划线将函数名变得混乱难懂。

### 6.1.2. 跨项目的代码应当保持一致的用法

如果有两种语义上等价只是形式上不同的写法，应当只选择其中的一种，以避免代码中发生无意义的发散演化，同时也避免在代码审查的过程中进行无意义的争辩。

除此之外，还应当尽可能与 JavaScript 的代码风格保持一致，因为大部分程序员都会同时使用两种语言。

例如：

- 变量名的首字母大小写风格。
- `x as T` 语法和等价的 `<T>x` 语法（后者不允许使用）。
- `Array<[number, number]>` 和 `[number, number][]` 。

### 6.1.3. 代码应当具有长期可维护性
代码的生命周期往往比其原始作者为其工作的时间要长，而 TypeScript 团队必须保证谷歌的所有工作在未来依然能顺利进行。

例如：

- 使用自动化工具修改代码，所有的代码均经过自动格式化以符合空格样式的规范。
规定了一组 Clousure 编译器标识，使 TS 代码库在编写过程中无需考虑编译选项的问题，也让用户能够安全地使用共享库。
- 代码在使用其它库时必须进行导入（严格依赖），以便依赖项中的重构不会改变其用户的依赖项。
- 用户必须编写测试。如果没有测试，就无法保证对语言或 google3 库中的改动不会破坏用户现有的代码。

### 6.1.4. 代码审查员应当着力于提高代码质量，而非强制推行各种规则
如果能够将规范实现为自动化检查工具，这通常都是一个好的做法。这对上文中的第三条原则也有所帮助。

对于确实无关紧要的问题，例如语言中十分罕见的边界情况，或者避免了一个不太可能发生的 Bug ，等等，不妨直接无视之。