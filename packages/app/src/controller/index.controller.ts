import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';
import { BaseController, Path, Private, Param, Query, RequestMethod, Aspect, Service, Result } from '../../../core/src/mod.ts';

import TestService from '../service/test.service.ts';
import { AgeCheck } from '../decorator/AgeCheck.ts';
import UserService from '../service/user.service.ts';

export default class Index extends BaseController {

    @Service(TestService)
    testService: TestService

    @Service('user')
    userService: UserService;

    index() {
        console.log(this.userService.getDefaultUserAge());

        // console.log('\n\n', this.ctx.i18n.hi);

        // this.ctx.setLocale('en-us');

        // console.log(this.ctx.i18n.hi);

        // this.ctx.setLocale('zh-cn');

        // console.log(this.ctx.i18n.hi);

        // return this.view('index.html', {
        //     frameName: this.testService.returnFrameName(),
        // });
    }

    @Path('/reg/:name*')
    @Aspect.around('test')
    reg(@AgeCheck('age') age: number, @Param('name') name: string) {
        return Result.send(`this is reg router. ${name} ${age}`);
    }

    @Path({
        value: ['/submit', '/yu/:id'],
        method: RequestMethod.POST
    })
    submit() {
        // this.ctx.request.body
        // this.ctx.request.files
        return Result.send('submit success');
    }

    @Path('/test', '/static/test2')
    async test() {
        console.log('>>>');

        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('<<<');

        return Result.send('this is static router');
    }

    // @Path('/cookie')
    // cookie() {
    //     this.ctx.cookies.set('hehe', 'cookie set done');

    //     return Result.send(this.ctx.cookies.get('hehe'));
    // }

    @Private
    inline() {
        return Result.send('this is private router');
    }

    // @Path('/ss')
    // ss() {
    //     this.ctx.session.set('haha', 'Hello World');
    //     return Result.send(this.ctx.session.get('haha'));
    // }

    @Path({
        method: RequestMethod.POST
    })
    onlyGet() {
        return Result.send('this method only can post');
    }

    @Path('/home/:name')
    params(@Param('name') name: string, @Query('title') title: string) {
        return Result.send(`name=${name}, title=${title}`);
    }

    // @Path('/download')
    // downFile() {
    //     return Result.download('/src/controller/template.controller.ts');
    // }

    // @Path('/stream')
    // donwStream() {
    //     const rs = fs.createReadStream(path.resolve(Deno.cwd(), './template.controller.ts'));
    //     return Result.stream(rs, 'controller.ts');
    // }
}
